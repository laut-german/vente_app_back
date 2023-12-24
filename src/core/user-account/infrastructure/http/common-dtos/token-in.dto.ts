import { IsNotEmpty, IsString } from "class-validator";
export class TokenInDto {
  @IsNotEmpty()
  @IsString()
  token: string;
}
