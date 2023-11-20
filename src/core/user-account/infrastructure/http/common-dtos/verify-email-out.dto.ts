export class VerifyEmailOutDto {
  readonly id: string;
  readonly emailVerification: boolean;
  constructor(partial: Partial<VerifyEmailOutDto>) {
    Object.assign(this, partial);
  }
}
