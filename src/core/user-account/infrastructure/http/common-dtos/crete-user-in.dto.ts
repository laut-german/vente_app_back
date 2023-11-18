import { IsNotEmpty, IsString, IsEmail, IsEnum } from "class-validator";
import { LanguageEnum } from "@users/domain/enums/language.enum";
export class CreateUserInDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsEnum(LanguageEnum)
  language: LanguageEnum;
  @IsNotEmpty()
  @IsString()
  password: string;
}
