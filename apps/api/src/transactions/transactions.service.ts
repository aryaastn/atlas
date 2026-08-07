import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.transaction.findMany({
      where: {
        account: {
          is: {
            workspace: {
              is: {
                ownerId: userId,
                type: 'PERSONAL',
              },
            },
          },
        },
      },
      select: {
        id: true,
        type: true,
        amount: true,
        description: true,
        occurredAt: true,
        createdAt: true,
        updatedAt: true,
        account: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            type: true,
            color: true,
            icon: true,
          },
        },
      },
      orderBy: [
        {
          occurredAt: 'desc',
        },
        {
          createdAt: 'desc',
        },
      ],
    });
  }

  async create(userId: string, dto: CreateTransactionDto) {
    const [account, category] = await Promise.all([
      this.prisma.account.findFirst({
        where: {
          id: dto.accountId,
          isArchived: false,
          workspace: {
            is: {
              ownerId: userId,
              type: 'PERSONAL',
            },
          },
        },
        select: {
          id: true,
        },
      }),
      this.prisma.category.findFirst({
        where: {
          id: dto.categoryId,
          isArchived: false,
          workspace: {
            is: {
              ownerId: userId,
              type: 'PERSONAL',
            },
          },
        },
        select: {
          id: true,
          type: true,
        },
      }),
    ]);

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (category.type !== dto.type) {
      throw new BadRequestException(
        'Category type must match transaction type',
      );
    }

    const description = dto.description?.trim();

    return this.prisma.transaction.create({
      data: {
        accountId: account.id,
        categoryId: category.id,
        type: dto.type,
        amount: dto.amount,
        description: description || undefined,
        occurredAt: dto.occurredAt
          ? new Date(dto.occurredAt)
          : undefined,
      },
      select: {
        id: true,
        type: true,
        amount: true,
        description: true,
        occurredAt: true,
        createdAt: true,
        updatedAt: true,
        account: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            type: true,
            color: true,
            icon: true,
          },
        },
      },
    });
  }
}