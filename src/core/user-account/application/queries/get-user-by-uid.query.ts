import { Inject } from "@nestjs/common";

import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import {
  GetUserAccountResponse,
  userResponseFromDomain,
} from "@users/application/responses/user-account.response";
import {
  USER_ACCOUNT_REPOSITORY,
  UserAccountRepository,
} from "@users/domain/storage/user-account.repository";

export class GetUserByUidQuery {
  constructor(public readonly uid: string) {}
}

@QueryHandler(GetUserByUidQuery)
export class GetUserByUidQueryHandler
  implements IQueryHandler<GetUserByUidQuery, GetUserAccountResponse>
{
  constructor(
    @Inject(USER_ACCOUNT_REPOSITORY)
    private readonly userAccountRepository: UserAccountRepository,
  ) {}
  async execute(query: GetUserByUidQuery): Promise<GetUserAccountResponse> {
    const userAccount = await this.userAccountRepository.findUserAccountByUid(
      query.uid,
    );
    return userAccount ? userResponseFromDomain(userAccount) : undefined;
  }
}
