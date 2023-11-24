import { HttpException, HttpStatus } from "@nestjs/common";

export class FirebaseAccountNotUpdatedError extends HttpException {
  /**
   * Create a new instance of FirebaseAccountNotCreatedError.
   * @param email that already was unable to update
   */
  constructor(private email: string) {
    const errorMessage = `Firebase account for ${email} was unable to update`;
    super(errorMessage, HttpStatus.BAD_REQUEST);
  }
}
