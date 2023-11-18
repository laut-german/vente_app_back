import { Module } from "@nestjs/common";
import { EventController } from "./http/event.controller";

@Module({
  imports: [],
  controllers: [EventController],
  providers: [],
})
export class EventModule {}
