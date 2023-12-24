import {
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  NestMiddleware,
} from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import {
  USER_ACCOUNT_REPOSITORY,
  UserAccountRepository,
} from "@users/domain/storage/user-account.repository";
import {
  AUTH_PROVIDER_REPOSITORY,
  AuthProviderRepository,
} from "@users/domain/storage/auth-provider.repository";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import * as jwt from "jsonwebtoken";
import { ConfigAux } from "../../../utils/config.aux";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly jwtSecretKey = new ConfigAux(process.env).getValue(
    "JWT_SECRET_KEY",
  );

  constructor(
    @Inject(USER_ACCOUNT_REPOSITORY)
    private readonly userAccountRepository: UserAccountRepository,
    @Inject(AUTH_PROVIDER_REPOSITORY)
    private authProviderRepository: AuthProviderRepository,
  ) {}
  createAuthenticationMiddleware(): NestMiddleware["use"] {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const authorizationToken = req.headers.authorization;
        if (!authorizationToken) {
          throw new ForbiddenException("Access denied");
        }
        const token = authorizationToken.replace("Bearer ", "");
        if (!token) {
          throw new ForbiddenException("no auth token sent");
        }
        const decodedToken =
          await this.authProviderRepository.verifyIdToken(token);
        if (!decodedToken.email_verified) {
          this.logger.error(`Email not verified`);
          throw new ForbiddenException("Access denied");
        }
        const currentUser =
          await this.userAccountRepository.findUserAccountByEmail(
            decodedToken.email,
          );
        if (!currentUser)
          throw new ForbiddenException("user requested not found");
        next();
      } catch (exception) {
        if (exception instanceof ForbiddenException) {
          this.sendExceptionResponse(
            exception.message,
            StatusCodes.FORBIDDEN,
            res,
          );
        } else if (exception.errorInfo?.code === "auth/id-token-expired") {
          this.sendExceptionResponse(
            "token expired",
            StatusCodes.FORBIDDEN,
            res,
          );
        } else {
          this.sendExceptionResponse(
            exception.message,
            StatusCodes.INTERNAL_SERVER_ERROR,
            res,
          );
        }
      }
    };
  }

  createEmailVerificationToken(id: string, email: string): string {
    const payload = {
      userAccountId: id,
      email: email,
    };

    return jwt.sign(payload, this.jwtSecretKey, { expiresIn: "7d" });
  }

  decodeEmailVerificationToken(
    token,
  ): null | { userAccountId: string; email: string } {
    try {
      return jwt.verify(token, this.jwtSecretKey) as {
        userAccountId: string;
        email: string;
      };
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }

  private sendExceptionResponse(
    messageException: string,
    status: StatusCodes,
    response: Response,
  ): void {
    this.logger.warn(`An exception occurred: ${messageException}`);
    response.status(status).json({
      statusCode: status,
      message:
        status !== StatusCodes.INTERNAL_SERVER_ERROR
          ? messageException
          : getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    });
  }
}
