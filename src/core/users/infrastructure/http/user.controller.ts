import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateUserInDto } from "./common-dtos/crete-user-in.dto";
import { CreateUserOutDto } from "./common-dtos/create-user-out.dto";
import { CreateUserCommand } from "@users/application/commands/create-user.command";
import { UserResponse } from "@users/application/responses/user.response";
import { plainToClass } from "class-transformer";

@ApiTags("v1/users")
@Controller("v1/users")
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post("register-user")
  async createUser(
    @Body() createUserDto: CreateUserInDto,
  ): Promise<CreateUserOutDto> {
    const applicationDTO = await this.commandBus.execute<
      CreateUserCommand,
      UserResponse
    >(
      new CreateUserCommand(
        createUserDto.name,
        createUserDto.email,
        createUserDto.language,
        createUserDto.password,
      ),
    );
    return plainToClass(CreateUserOutDto, applicationDTO);
  }
}
