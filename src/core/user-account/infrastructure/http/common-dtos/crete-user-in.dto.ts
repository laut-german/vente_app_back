import { IsNotEmpty, IsString, IsEmail } from "class-validator";
export class CreateUserInDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  language: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
