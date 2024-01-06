import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import {
  USER_ACCOUNT_REPOSITORY,
  UserAccountRepository,
} from "../../domain/storage/user-account.repository";
import { UserEmailAlreadyExists } from "../../domain/errors/user-email-already-exists.error";
import { UserAccount } from "../../domain/entities/user-account.entity";
import {
  AUTH_PROVIDER_REPOSITORY,
  AuthProviderRepository,
} from "../../domain/storage/auth-provider.repository";
import { LanguageEnum } from "@users/domain/enums/language.enum";
import {
  CreateUserSSOAccountResponse,
  userSSOResponseFromDomain,
} from "@users/application/responses/create-sso-user.response";
export class CreateUserSSOAccountCommand {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly language: LanguageEnum,
    public readonly uid: string,
  ) {}
}

@CommandHandler(CreateUserSSOAccountCommand)
export class CreateUserSSOAccountCommandHandler
  implements
    ICommandHandler<CreateUserSSOAccountCommand, CreateUserSSOAccountResponse>
{
  constructor(
    @Inject(USER_ACCOUNT_REPOSITORY)
    private readonly userAccountRepository: UserAccountRepository,
    @Inject(AUTH_PROVIDER_REPOSITORY)
    private authProviderRepository: AuthProviderRepository,
  ) {}

  async execute({
    name,
    email,
    language,
    uid,
  }: CreateUserSSOAccountCommand): Promise<CreateUserSSOAccountResponse> {
    const emailExists =
      await this.userAccountRepository.findUserAccountByEmail(email);
    if (emailExists) {
      throw new UserEmailAlreadyExists(email);
    }
    const userAccount = await this.userAccountRepository.createUserAccount(
      UserAccount.create({ name, email, language, uid }),
    );

    return userSSOResponseFromDomain(userAccount);
  }
}
