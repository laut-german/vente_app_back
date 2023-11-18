import { Module } from "@nestjs/common";
import { UserController } from "../infrastructure/http/user.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { UserDocument, UserSchema } from "./store/schemas/user.schema";
import { USER_REPOSITORY } from "../domain/storage/user.repository";
import { MongoUserRepository } from "../infrastructure/store/repositories/mongo-user.repository";
import { CreateUserCommandHandler } from "../application/commands/create-user.command";
import { ACCOUNT_REPOSITORY } from "../domain/storage/account.repository";
import { FirebaseAccountRepository } from "../infrastructure/store/repositories/firebase-account.repository";
import { AuthService } from "@users/application/auth.service";

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: MongoUserRepository,
    },
    {
      provide: ACCOUNT_REPOSITORY,
      useClass: FirebaseAccountRepository,
    },
    CreateUserCommandHandler,
    AuthService,
  ],
  exports: [AuthService],
})
export class UserModule {}
