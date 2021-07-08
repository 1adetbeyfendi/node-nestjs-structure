import { Inject, Logger, UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { JwtAuthGuard } from 'src/auth';
import { ReqUser, Role, Roles, RolesGuard } from 'src/common';
import { PUB_SUB } from 'src/common/pub-sub.module';
import { MyOrder } from 'src/gql/models/positions.model';
import { API } from 'src/trades/helper/commas-repo';
import { TradeCommasService } from 'src/trades/services';

const POST_ADDED_EVENT = 'postAdded';

@Resolver()
export class PositionsResolver {
  private readonly logger = new Logger(PositionsResolver.name);
  /**
   *
   */
  api: API;
  constructor(
    // private readonly tradesService: TradesService,
    public commasService: TradeCommasService,
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
  ) {
    this.api = commasService.generateApi();
  }

  @Query(() => String)
  getHello(): string {
    return 'hii';
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  // @UseGuards(RolesGuard)
  @Roles(Role.Auth)
  @Mutation((returns) => [MyOrder])
  async getActiveOrders(@ReqUser() user) {
    const response = await this.api.getSmartTradeHistory({
      status: 'active',
      account_id: user.accId,
      // page: 1,
    });
    console.debug(response);
    // this.logger.debug('orders', response);

    return response;
  }

  @UseGuards(JwtAuthGuard)
  // @Roles(Role.Auth)
  @Subscription((returns) => [MyOrder])
  postAdded(@ReqUser() user) {
    console.log('reqUser: ', user);

    return this.pubSub.asyncIterator(POST_ADDED_EVENT);
  }

  @Query(() => String)
  getOrders(): string {
    return 'hii';
  }
}
