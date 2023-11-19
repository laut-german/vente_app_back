import { Module } from "@nestjs/common";
import { MeetupController } from "./http/meetup.controller";

@Module({
  imports: [],
  controllers: [MeetupController],
  providers: [],
})
export class MeetupModule {}
