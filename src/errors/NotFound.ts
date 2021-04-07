import { Catch, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class NotFound extends HttpException {
  constructor(name: string) {
    super(`${name}_NOT_FOUND`, 404);
  }
}
