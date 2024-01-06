import {Body, Controller, Post, Get, Param, Patch, ParseBoolPipe} from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateUserAccInDto } from "./common-dtos/crete-user-acc-in.dto";
import { CreateUserAccOutDto } from "./common-dtos/create-user-acc-out.dto";
import { CreateUserAccountCommand } from "../../application/commands/create-user-account.command";
import { CrateUserAccountResponse } from "../../application/responses/crate-user-account.response";
import { CreateUserSSOAccInDto } from "@users/infrastructure/http/common-dtos/create-usersso-acc-in.dto";
import { CreateUserSSOAccountCommand } from "@users/application/commands/create-usersso-acc.command";
import { GetUserByUidQuery } from "@users/application/queries/get-user-by-uid.query";
import { CheckIfUserExistsOutDto } from "@users/infrastructure/http/common-dtos/check-if-user-exists-out.dto";
import { EmailAccVerificationUpdateCommand } from "@users/application/commands/email-acc-verification-update.command";
import { EmailVerificationUpdateResponse } from "@users/application/responses/email-verification-update.response";
import { VerifyEmailOutDto } from "@users/infrastructure/http/common-dtos/verify-email-out.dto";
import { TokenInDto } from "@users/infrastructure/http/common-dtos/token-in.dto";

@ApiTags("v1/user-account")
@Controller("v1/user-account")
export class UserAccountController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post("register")
  @ApiOperation({ description: "register an user account." })
  @ApiOkResponse({ type: [CreateUserAccOutDto] })
  async createUserAccount(
    @Body() createUserDto: CreateUserAccInDto,
  ): Promise<CreateUserAccOutDto> {
    const userAccount = await this.commandBus.execute<
      CreateUserAccountCommand,
      CrateUserAccountResponse
    >(
      new CreateUserAccountCommand(
        createUserDto.name,
        createUserDto.email,
        createUserDto.language,
        createUserDto.password,
      ),
    );
    return new CreateUserAccOutDto(userAccount);
  }

  @Post("register-sso")
  @ApiOperation({
    description:
      "register an user account that was created with single sign on.",
  })
  @ApiOkResponse({ type: [CreateUserAccOutDto] })
  async createSSOUserAccount(
    @Body() createUserDto: CreateUserSSOAccInDto,
  ): Promise<CreateUserAccOutDto> {
    const userAccount = await this.commandBus.execute<
      CreateUserSSOAccountCommand,
      CrateUserAccountResponse
    >(
      new CreateUserSSOAccountCommand(
        createUserDto.name,
        createUserDto.email,
        createUserDto.language,
        createUserDto.uid,
      ),
    );
    return new CreateUserAccOutDto(userAccount);
  }
  @Get(":uid/exists")
  @ApiOperation({
    description: "check if the user account was already registered",
  })
  @ApiOkResponse({ type: [CheckIfUserExistsOutDto] })
  async checkIfUserRegistered(@Param("uid") uid: string) {
    const userAccount = await this.queryBus.execute<
      GetUserByUidQuery,
      CrateUserAccountResponse
    >(new GetUserByUidQuery(uid));
    return new CheckIfUserExistsOutDto(userAccount);
  }
  @Patch("verify-email")
  @ApiOperation({ description: "set email verification to true" })
  @ApiOkResponse({ type: [VerifyEmailOutDto] })
  async updateVerificationMail(
    @Body() tokenDto: TokenInDto,
  ): Promise<VerifyEmailOutDto> {
    const emailVerificationUpdateResponse = await this.commandBus.execute<
      EmailAccVerificationUpdateCommand,
      EmailVerificationUpdateResponse
    >(new EmailAccVerificationUpdateCommand(tokenDto.token));

    return new VerifyEmailOutDto(emailVerificationUpdateResponse);
  }
}
