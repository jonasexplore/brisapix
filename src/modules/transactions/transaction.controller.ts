import { Controller, Get } from '@nestjs/common';

@Controller('/transactions')
export class TransactionController {
  @Get()
  getAll() {
    return [];
  }
}
