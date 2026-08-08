import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.account.findMany({
      where: {
        workspace: {
          is: {
            ownerId: userId,
            type: 'PERSONAL',
          },
        },
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
        isArchived: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(userId: string, dto: CreateAccountDto) {
    const workspace = await this.prisma.workspace.findFirst({
      where: {
        ownerId: userId,
        type: 'PERSONAL',
      },
      select: {
        id: true,
      },
    });

    if (!workspace) {
      throw new NotFoundException('Personal workspace not found');
    }

    return this.prisma.account.create({
      data: {
        workspaceId: workspace.id,
        name: dto.name.trim(),
        type: dto.type,
        openingBalance: dto.openingBalance ?? 0,
      },
      select: {
        id: true,
        name: true,
        type: true,
        openingBalance: true,
        currency: true,
        color: true,
        icon: true,
        isArchived: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(
    userId: string,
    id: string,
    dto: UpdateAccountDto,
  ) {
    const hasUpdate =
      dto.name !== undefined ||
      dto.type !== undefined ||
      dto.openingBalance !== undefined;

    if (!hasUpdate) {
      throw new BadRequestException(
        'At least one field must be provided',
      );
    }

    const account = await this.prisma.account.findFirst({
      where: {
        id,
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
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    if (
      dto.name !== undefined &&
      dto.name.trim().length === 0
    ) {
      throw new BadRequestException(
        'Account name must not be empty',
      );
    }

    return this.prisma.account.update({
      where: {
        id: account.id,
      },
      data: {
        name:
          dto.name !== undefined
            ? dto.name.trim()
            : undefined,
        type: dto.type,
        openingBalance: dto.openingBalance,
      },
      select: {
        id: true,
        name: true,
        type: true,
        openingBalance: true,
        currency: true,
        color: true,
        icon: true,
        isArchived: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async archive(userId: string, id: string) {
    const account = await this.prisma.account.findFirst({
      where: {
        id,
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
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return this.prisma.account.update({
      where: {
        id: account.id,
      },
      data: {
        isArchived: true,
      },
      select: {
        id: true,
        name: true,
        type: true,
        openingBalance: true,
        currency: true,
        color: true,
        icon: true,
        isArchived: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}