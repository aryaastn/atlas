import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsService } from './transactions.service';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email: string;
  };
}

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
  ) {}

  @Get()
  getTransactions(@Req() request: AuthenticatedRequest) {
    return this.transactionsService.findAll(
      request.user.userId,
    );
  }

  @Post()
  createTransaction(
    @Req() request: AuthenticatedRequest,
    @Body() dto: CreateTransactionDto,
  ) {
    return this.transactionsService.create(
      request.user.userId,
      dto,
    );
  }

  @Patch(':id')
  updateTransaction(
    @Req() request: AuthenticatedRequest,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(
      request.user.userId,
      id,
      dto,
    );
  }

  @Delete(':id')
  deleteTransaction(
    @Req() request: AuthenticatedRequest,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.transactionsService.remove(
      request.user.userId,
      id,
    );
  }
}