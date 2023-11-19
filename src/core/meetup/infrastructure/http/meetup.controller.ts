import { Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("v1/events")
@Controller("v1/events")
export class MeetupController {
  constructor() {}
  @Post("dummy")
  async dummy() {
    console.log("NO debo llegar aquí sin un token valido");
  }
}
