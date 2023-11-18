

export class CreateUserOutDto {
  readonly id: string;

  readonly name: string;

  readonly email: string;

  readonly profilePicture: string;
  constructor(partial: Partial<CreateUserOutDto>) {
    Object.assign(this, partial);
  }
}
