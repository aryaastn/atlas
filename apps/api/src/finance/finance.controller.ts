import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FinanceService } from './finance.service';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email: string;
  };
}

@UseGuards(JwtAuthGuard)
@Controller('finance')
export class FinanceController {
  constructor(
    private readonly financeService: FinanceService,
  ) {}

  @Get('summary')
  getSummary(@Req() request: AuthenticatedRequest) {
    return this.financeService.getSummary(
      request.user.userId,
    );
  }
}
