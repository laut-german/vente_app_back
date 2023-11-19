import { IsNotEmpty, IsString, IsEmail, IsEnum } from "class-validator";
import { LanguageEnum } from "@users/domain/enums/language.enum";
export class CreateUserSSOAccInDto {
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
  uid: string;
}
