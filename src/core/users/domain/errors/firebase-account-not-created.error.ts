import { HttpException, HttpStatus } from "@nestjs/common";

export class FirebaseAccountNotCreatedError extends HttpException {
  /**
   * Create a new instance of FirebaseAccountNotCreatedError.
   * @param email that already was unable to create
   */
  constructor(private email: string) {
    const errorMessage = `Firebase account for ${email} was unable to create`;
    super(errorMessage, HttpStatus.BAD_REQUEST);
  }
}
