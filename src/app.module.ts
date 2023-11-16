import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import * as dotenv from "dotenv";
import { DB_STRING_CONNECTION } from "./utils/conf.properties";
import { UserModule } from "@users/infrastructure/user.module";
dotenv.config();
@Module({
  imports: [MongooseModule.forRoot(DB_STRING_CONNECTION), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
