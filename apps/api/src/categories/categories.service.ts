import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

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

  async update(
    userId: string,
    id: string,
    dto: UpdateCategoryDto,
  ) {
    if (dto.name === undefined) {
      throw new BadRequestException(
        'At least one field must be provided',
      );
    }

    const category = await this.prisma.category.findFirst({
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
        workspaceId: true,
        name: true,
        type: true,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const name = dto.name.trim();

    if (name.length === 0) {
      throw new BadRequestException(
        'Category name must not be empty',
      );
    }

    const existingCategory = await this.prisma.category.findUnique({
      where: {
        workspaceId_name_type: {
          workspaceId: category.workspaceId,
          name,
          type: category.type,
        },
      },
      select: {
        id: true,
      },
    });

    if (
      existingCategory &&
      existingCategory.id !== category.id
    ) {
      throw new ConflictException(
        'Category with this name and type already exists',
      );
    }

    return this.prisma.category.update({
      where: {
        id: category.id,
      },
      data: {
        name,
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

  async archive(userId: string, id: string) {
    const category = await this.prisma.category.findFirst({
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

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return this.prisma.category.update({
      where: {
        id: category.id,
      },
      data: {
        isArchived: true,
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