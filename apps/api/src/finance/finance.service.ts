import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

type DecimalValue = {
  toFixed(decimalPlaces?: number): string;
};

@Injectable()
export class FinanceService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary(userId: string) {
    const workspace = await this.prisma.workspace.findFirst({
      where: {
        ownerId: userId,
        type: 'PERSONAL',
      },
      select: {
        id: true,
        currency: true,
      },
    });

    if (!workspace) {
      throw new NotFoundException('Personal workspace not found');
    }

    const [accounts, transactionTotals] = await Promise.all([
      this.prisma.account.findMany({
        where: {
          workspaceId: workspace.id,
          isArchived: false,
        },
        select: {
          id: true,
          name: true,
          type: true,
          openingBalance: true,
          currency: true,
          color: true,
          icon: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.transaction.groupBy({
        by: ['accountId', 'type'],
        where: {
          account: {
            is: {
              workspaceId: workspace.id,
              isArchived: false,
            },
          },
        },
        _sum: {
          amount: true,
        },
      }),
    ]);

    const totalsByAccount = new Map<
      string,
      {
        income: bigint;
        expense: bigint;
      }
    >();

    for (const total of transactionTotals) {
      const current = totalsByAccount.get(total.accountId) ?? {
        income: 0n,
        expense: 0n,
      };

      const amount = this.toMinorUnits(total._sum.amount);

      if (total.type === 'INCOME') {
        current.income = amount;
      } else {
        current.expense = amount;
      }

      totalsByAccount.set(total.accountId, current);
    }

    let totalOpeningBalance = 0n;
    let totalIncome = 0n;
    let totalExpense = 0n;

    const accountSummaries = accounts.map((account) => {
      const openingBalance = this.toMinorUnits(
        account.openingBalance,
      );

      const transactionTotal = totalsByAccount.get(account.id) ?? {
        income: 0n,
        expense: 0n,
      };

      const currentBalance =
        openingBalance +
        transactionTotal.income -
        transactionTotal.expense;

      totalOpeningBalance += openingBalance;
      totalIncome += transactionTotal.income;
      totalExpense += transactionTotal.expense;

      return {
        id: account.id,
        name: account.name,
        type: account.type,
        currency: account.currency,
        color: account.color,
        icon: account.icon,
        openingBalance: this.fromMinorUnits(openingBalance),
        income: this.fromMinorUnits(transactionTotal.income),
        expense: this.fromMinorUnits(transactionTotal.expense),
        currentBalance: this.fromMinorUnits(currentBalance),
      };
    });

    const netCashFlow = totalIncome - totalExpense;
    const totalBalance = totalOpeningBalance + netCashFlow;

    return {
      currency: workspace.currency,
      totalBalance: this.fromMinorUnits(totalBalance),
      totalIncome: this.fromMinorUnits(totalIncome),
      totalExpense: this.fromMinorUnits(totalExpense),
      netCashFlow: this.fromMinorUnits(netCashFlow),
      accounts: accountSummaries,
    };
  }

  private toMinorUnits(
    value: DecimalValue | null | undefined,
  ): bigint {
    if (!value) {
      return 0n;
    }

    return BigInt(value.toFixed(2).replace('.', ''));
  }

  private fromMinorUnits(value: bigint): string {
    const negative = value < 0n;
    const absolute = negative ? -value : value;

    const whole = absolute / 100n;
    const fraction = (absolute % 100n)
      .toString()
      .padStart(2, '0');

    return `${negative ? '-' : ''}${whole}.${fraction}`;
  }
}
