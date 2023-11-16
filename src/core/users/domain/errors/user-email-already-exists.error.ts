import { HttpException, HttpStatus } from "@nestjs/common";

export class UserEmailAlreadyExists extends HttpException {
  /**
   * Create a new instance of UserEmailAlreadyExists.
   * @param email that already exists
   */
  constructor(private email: string) {
    const errorMessage = `User email ${email} already exists`;
    super(errorMessage, HttpStatus.BAD_REQUEST);
  }
}
