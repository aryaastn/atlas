import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

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

  async update(
    userId: string,
    id: string,
    dto: UpdateTransactionDto,
  ) {
    const hasUpdate =
  dto.accountId !== undefined ||
  dto.categoryId !== undefined ||
  dto.type !== undefined ||
  dto.amount !== undefined ||
  dto.description !== undefined ||
  dto.occurredAt !== undefined;

if (!hasUpdate) {
  throw new BadRequestException(
    'At least one field must be provided',
  );
}

    const transaction = await this.prisma.transaction.findFirst({
      where: {
        id,
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
        accountId: true,
        categoryId: true,
        type: true,
        category: {
          select: {
            type: true,
          },
        },
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    const account = dto.accountId
      ? await this.prisma.account.findFirst({
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
        })
      : {
          id: transaction.accountId,
        };

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const category = dto.categoryId
      ? await this.prisma.category.findFirst({
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
        })
      : {
          id: transaction.categoryId,
          type: transaction.category.type,
        };

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const type = dto.type ?? transaction.type;

    if (category.type !== type) {
      throw new BadRequestException(
        'Category type must match transaction type',
      );
    }

    return this.prisma.transaction.update({
      where: {
        id: transaction.id,
      },
      data: {
        accountId: dto.accountId
          ? account.id
          : undefined,
        categoryId: dto.categoryId
          ? category.id
          : undefined,
        type: dto.type,
        amount: dto.amount,
        description:
          dto.description !== undefined
            ? dto.description.trim() || null
            : undefined,
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

  async remove(userId: string, id: string) {
    const transaction = await this.prisma.transaction.findFirst({
      where: {
        id,
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
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return this.prisma.transaction.delete({
      where: {
        id: transaction.id,
      },
      select: {
        id: true,
      },
    });
  }
}