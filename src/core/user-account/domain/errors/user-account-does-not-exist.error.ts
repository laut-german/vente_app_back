import { HttpException, HttpStatus } from "@nestjs/common";

export class UserAccountDoesNotExistError extends HttpException {
  /**
   * Create a new instance of UserAccountDoesNotExistError.
   */
  constructor() {
    const errorMessage = `User account does not exist`;
    super(errorMessage, HttpStatus.BAD_REQUEST);
  }
}
