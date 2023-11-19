export class CreateUserAccOutDto {
  readonly id: string;

  readonly name: string;

  readonly email: string;

  readonly profilePicture: string;
  constructor(partial: Partial<CreateUserAccOutDto>) {
    Object.assign(this, partial);
  }
}
