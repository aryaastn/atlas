import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email: string;
  };
}

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
  ) {}

  @Get()
  getCategories(@Req() request: AuthenticatedRequest) {
    return this.categoriesService.findAll(
      request.user.userId,
    );
  }

  @Post()
  createCategory(
    @Req() request: AuthenticatedRequest,
    @Body() dto: CreateCategoryDto,
  ) {
    return this.categoriesService.create(
      request.user.userId,
      dto,
    );
  }
}
