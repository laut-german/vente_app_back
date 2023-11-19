import { Body, Controller, Post, Get, Param } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateUserAccInDto } from "./common-dtos/crete-user-acc-in.dto";
import { CreateUserAccOutDto } from "./common-dtos/create-user-acc-out.dto";
import { CreateUserAccountCommand } from "../../application/commands/create-user-account.command";
import { UserAccountResponse } from "../../application/responses/user-account.response";
import { plainToClass } from "class-transformer";
import { CreateUserSSOAccInDto } from "@users/infrastructure/http/common-dtos/create-usersso-acc-in.dto";
import { CreateUserSSOAccountCommand } from "@users/application/commands/create-usersso-acc.command";
import { GetUserByUidQuery } from "@users/application/queries/get-user-by-uid.query";
import { CheckIfUserExistsOutDto } from "@users/infrastructure/http/common-dtos/check-if-user-exists-out.dto";

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
      UserAccountResponse
    >(
      new CreateUserAccountCommand(
        createUserDto.name,
        createUserDto.email,
        createUserDto.language,
        createUserDto.password,
      ),
    );
    return plainToClass(CreateUserAccOutDto, userAccount);
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
      UserAccountResponse
    >(
      new CreateUserSSOAccountCommand(
        createUserDto.name,
        createUserDto.email,
        createUserDto.language,
        createUserDto.uid,
      ),
    );
    return plainToClass(CreateUserAccOutDto, userAccount);
  }
  @Get(":uid/exists")
  @ApiOperation({
    description: "check if the user account was already registered",
  })
  @ApiOkResponse({ type: [CheckIfUserExistsOutDto] })
  async checkIfUserRegistered(@Param("uid") uid: string) {
    const userAccount = await this.queryBus.execute<
      GetUserByUidQuery,
      UserAccountResponse
    >(new GetUserByUidQuery(uid));
    return new CheckIfUserExistsOutDto(userAccount);
  }
}
