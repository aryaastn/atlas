import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.category.findMany({
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
        color: true,
        icon: true,
        isArchived: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: [
        {
          type: 'asc',
        },
        {
          name: 'asc',
        },
      ],
    });
  }

  async create(userId: string, dto: CreateCategoryDto) {
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

    const name = dto.name.trim();

    const existingCategory = await this.prisma.category.findUnique({
      where: {
        workspaceId_name_type: {
          workspaceId: workspace.id,
          name,
          type: dto.type,
        },
      },
      select: {
        id: true,
      },
    });

    if (existingCategory) {
      throw new ConflictException(
        'Category with this name and type already exists',
      );
    }

    return this.prisma.category.create({
      data: {
        workspaceId: workspace.id,
        name,
        type: dto.type,
      },
      select: {
        id: true,
        name: true,
        type: true,
        color: true,
        icon: true,
        isArchived: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
