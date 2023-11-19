import { Module } from "@nestjs/common";
import { UserAccountController } from "./http/user-account.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { UserDocument, UserAccountSchema } from "./store/schemas/user-account.schema";
import { USER_ACCOUNT_REPOSITORY } from "../domain/storage/user-account.repository";
import { MongoUserRepository } from "../infrastructure/store/repositories/mongo-user.repository";
import { CreateUserCommandHandler } from "../application/commands/create-user-account.command";
import { AUTH_PROVIDER_REPOSITORY } from "../domain/storage/auth-provider.repository";
import { FirebaseProviderRepository } from "./store/repositories/firebase-provider.repository";
import { AuthService } from "@users/application/auth.service";
import { CreateUserSSOAccountCommandHandler } from "@users/application/commands/create-usersso-acc.command";
import { GetUserByIdQueryHandler } from "@users/application/queries/get-user-by-uid.query";

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: UserDocument.name, schema: UserAccountSchema },
    ]),
  ],
  controllers: [UserAccountController],
  providers: [
    {
      provide: USER_ACCOUNT_REPOSITORY,
      useClass: MongoUserRepository,
    },
    {
      provide: AUTH_PROVIDER_REPOSITORY,
      useClass: FirebaseProviderRepository,
    },
    CreateUserCommandHandler,
    CreateUserSSOAccountCommandHandler,
    GetUserByIdQueryHandler,
    AuthService,
  ],
  exports: [AuthService],
})
export class UserModule {}
