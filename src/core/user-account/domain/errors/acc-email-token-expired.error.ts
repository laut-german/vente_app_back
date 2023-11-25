import { HttpException, HttpStatus } from "@nestjs/common";

export class AccEmailTokenExpiredError extends HttpException {
  /**
   * Create a new instance of UserAccountDoesNotExistError.
   */
  constructor() {
    const errorMessage = `Token is already expired`;
    super(errorMessage, HttpStatus.BAD_REQUEST);
  }
}
