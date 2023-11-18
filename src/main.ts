import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PORT } from "./utils/conf.properties";
import { Logger } from "@nestjs/common";
import { ConfigAux } from "./utils/config.aux";
import * as admin from "firebase-admin";
import * as dotenv from "dotenv";
dotenv.config();
async function bootstrap() {
  const logger: Logger = new Logger("Main");
  const app = await NestFactory.create(AppModule);
  const firebaseConfig = new ConfigAux(process.env).getFirebaseConfig();
  try {
    admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
    });
  } catch (error) {
    logger.error(`Error initializing firebase app: ${error}`);
  }

  await app.listen(PORT);
  logger.verbose(`Started listen PORT: ${PORT || 3000}`);
}
bootstrap();
