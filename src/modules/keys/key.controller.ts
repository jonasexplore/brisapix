import { Controller, Get } from '@nestjs/common';

@Controller('/keys')
export class KeyController {
  @Get()
  getAllKeysByUserId(user_id: number) {
    return [];
  }
}
