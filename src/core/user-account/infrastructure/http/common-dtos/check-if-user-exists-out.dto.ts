export class CheckIfUserExistsOutDto {
  readonly id?: string;
  readonly name?: string;
  readonly email?: string;
  readonly profilePicture?: string;
  readonly exists: boolean;

  constructor(partial: Partial<CheckIfUserExistsOutDto> | null | undefined) {
    this.exists = !!partial;
  }
}
