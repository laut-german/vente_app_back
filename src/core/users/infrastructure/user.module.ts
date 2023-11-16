import { Module } from "@nestjs/common";
import { UserController } from "@users/infrastructure/http/user.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { UserDocument, UserSchema } from "./store/schemas/user.schema";
import { USER_REPOSITORY } from "@users/domain/storage/user.repository";
import { MongoUserRepository } from "@users/infrastructure/store/repositories/mongo-user.repository";
import { CreateUserCommandHandler } from "@users/application/commands/create-user.command";

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
    CreateUserCommandHandler,
  ],
})
export class UserModule {}
