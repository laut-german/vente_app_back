import { MiddlewareConsumer, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import * as dotenv from "dotenv";
import { DB_STRING_CONNECTION } from "./utils/conf.properties";
import { UserModule } from "@users/infrastructure/user.module";
import { AuthService } from "@users/application/auth.service";
import { MeetupModule } from "./core/meetup/infrastructure/meetup.module";
dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(DB_STRING_CONNECTION),
    UserModule,
    MeetupModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private readonly authService: AuthService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(this.authService.createAuthenticationMiddleware())
      .exclude(
        "v1/user-account/register",
        "v1/user-account/register-sso",
        "v1/user-account/:uid/exists",
      )
      .forRoutes("/");
  }
}
