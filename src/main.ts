import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PORT } from "./utils/conf.properties";
import { Logger } from "@nestjs/common";
async function bootstrap() {
  const logger: Logger = new Logger("Main");
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  logger.verbose(`Started listen PORT: ${PORT || 3000}`);
}
bootstrap();
