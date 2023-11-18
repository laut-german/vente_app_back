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
import {
  ACCOUNT_REPOSITORY,
  AccountRepository,
} from "@users/domain/storage/account.repository";
import { FirebaseAccountNotCreatedError } from "@users/domain/errors/firebase-account-not-created.error";
export class CreateUserCommand {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly language: string,
    public readonly password: string,
  ) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand, UserResponse> {

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(ACCOUNT_REPOSITORY)
    private accountRepository: AccountRepository,
  ) {}

  async execute({
    name,
    email,
    language,
    password,
  }: CreateUserCommand): Promise<UserResponse> {
    const emailExists = await this.userRepository.findUserByEmail(email);
    if (emailExists) {
      throw new UserEmailAlreadyExists(email);
    }
    let userAccount;
    try {
      userAccount = await this.accountRepository.createUserAccount(
        name,
        email,
        password,
      );
    } catch (error) {
      throw new FirebaseAccountNotCreatedError(email);
    }

    if (!userAccount) {
      throw new FirebaseAccountNotCreatedError(email);
    }
    const user = await this.userRepository.createUser(
      User.create({ name, email, language, uid: userAccount.uid }),
    );
    return userResponseFromDomain(user);
  }
}
