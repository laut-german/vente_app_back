import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import {
  USER_REPOSITORY,
  UserRepository,
} from "@users/domain/storage/user.repository";
import { UserEmailAlreadyExists } from "@users/domain/errors/user-email-already-exists.error";
import { User } from "@users/domain/entities/user.entity";
import {
  UserResponse,
  userResponseFromDomain,
} from "@users/application/responses/user.response";
import { v4 as uuidV4 } from "uuid";
export class CreateUserCommand {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly language: string,
  ) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand, UserResponse> {

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute({
    name,
    email,
    language,
  }: CreateUserCommand): Promise<UserResponse> {
    const emailExists = await this.userRepository.findUserByEmail(email);
    if (emailExists) {
      throw new UserEmailAlreadyExists(email);
    }
    const user = await this.userRepository.createUser(
      User.create({ name, email, language }),
    );
    return userResponseFromDomain(user);
  }
}
