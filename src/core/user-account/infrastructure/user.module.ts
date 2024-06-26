import { Module } from "@nestjs/common";
import { UserAccountController } from "./http/user-account.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import {
  UserDocument,
  UserAccountSchema,
} from "./store/schemas/user-account.schema";
import { USER_ACCOUNT_REPOSITORY } from "../domain/storage/user-account.repository";
import { MongoUserAccountRepository } from "./store/repositories/mongo-user-account.repository";
import { CreateUserCommandHandler } from "../application/commands/create-user-account.command";
import { AUTH_PROVIDER_REPOSITORY } from "../domain/storage/auth-provider.repository";
import { FirebaseProviderRepository } from "./store/repositories/firebase-provider.repository";
import { AuthService } from "@users/application/auth.service";
import { CreateUserSSOAccountCommandHandler } from "@users/application/commands/create-usersso-acc.command";
import { GetUserByUidQueryHandler } from "@users/application/queries/get-user-by-uid.query";
import { EmailAccVerificationUpdateCommandHandler } from "@users/application/commands/email-acc-verification-update.command";
import { EMAIL_VERIFICATION_REPOSITORY } from "@users/domain/storage/email-verification.repository";
import { MongoVerificationEmailRepository } from "@users/infrastructure/store/repositories/mongo-verification-email.repository";
import {
  AccountEmailVerificationDocument,
  EmailVerificationSchema,
} from "@users/infrastructure/store/schemas/account-email-verification.schema";
import { MAILER_SERVICE } from "../../../shared/domain/mailer.service";
import { MailjetMailerService } from "../../../shared/infrastructure/mailjet-mailer.service";
import { MAIL_BUILDER_SERVICE } from "../../../shared/domain/mail-builder.service";
import { HandlebarsMailBuilderService } from "../../../shared/infrastructure/handlebars-mail-builder.service";

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: UserDocument.name, schema: UserAccountSchema },
    ]),
    MongooseModule.forFeature([
      {
        name: AccountEmailVerificationDocument.name,
        schema: EmailVerificationSchema,
      },
    ]),
  ],
  controllers: [UserAccountController],
  providers: [
    {
      provide: USER_ACCOUNT_REPOSITORY,
      useClass: MongoUserAccountRepository,
    },
    {
      provide: AUTH_PROVIDER_REPOSITORY,
      useClass: FirebaseProviderRepository,
    },
    {
      provide: EMAIL_VERIFICATION_REPOSITORY,
      useClass: MongoVerificationEmailRepository,
    },
    {
      provide: MAILER_SERVICE,
      useClass: MailjetMailerService,
    },
    {
      provide: MAIL_BUILDER_SERVICE,
      useClass: HandlebarsMailBuilderService,
    },
    CreateUserCommandHandler,
    CreateUserSSOAccountCommandHandler,
    GetUserByUidQueryHandler,
    EmailAccVerificationUpdateCommandHandler,
    AuthService,
  ],
  exports: [AuthService],
})
export class UserModule {}
