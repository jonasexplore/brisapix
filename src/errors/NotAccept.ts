import { Catch, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class NotAccept extends HttpException {
  constructor(message: string) {
    super(`${message}`, 406);
  }
}

export class BadRequest extends HttpException {
  constructor(message: string) {
    super(`${message}`, 400);
  }
}

// export class NotAcceptDuplicatedKey extends HttpException {
//   constructor() {
//     super(`DUPLICATED_KEY`, 406);
//   }
// }
