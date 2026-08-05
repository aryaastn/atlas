import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';

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
}