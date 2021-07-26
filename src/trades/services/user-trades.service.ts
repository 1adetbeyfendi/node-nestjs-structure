/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Interval } from '@nestjs/schedule';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import * as _ from 'lodash';
import { PUB_SUB } from 'src/common';
import { MyOrder } from 'src/gql/models/positions.model';

import { API } from '../helper/commas-repo/index';
import { TradeCommasService } from './trade-commas.service';
import { TradeDataService } from './trade-data.service';
/*
  LocalDe kullanıcının işlemlerini güncelliyorum
  TODO: onModuleInit
*/
@Injectable()
export class UserTradesService {
  // eslint-disable-next-line @typescript-eslint/typedef
  private readonly logger = new Logger(UserTradesService.name);

  /**
   *
   */
  private api: API;
  private localOrders: MyOrder[] = [];

  constructor(
    @InjectSentry() private readonly client: SentryService,
    public tradeCommasService: TradeCommasService,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    private _tradeDataService: TradeDataService,
    private eventEmitter: EventEmitter2,
    private readonly configService: ConfigService, // @Inject(PUB_SUB) private pubSub: RedisPubSub,
  ) {
    // super();
    this.api = tradeCommasService.api;
    // eventEmitter.emit('position.service.status', { status: true });
  }

  
  // @Interval(1000)
  // diffPositions() {
  //   // console.log('asdfasdgasdgf');

  //   this.eventEmitter.emit('position.update', { test: '' });
  //   // new OrderCreatedEvent({
  //   //   orderId: 1,
  //   //   payload: {},
  //   // })
  // }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @OnEvent('position.update')
  handleOrderCreatedEvent(payload: { currentOrders: MyOrder[] }): void {
    // this.logger.log('position.update event', JSON.stringify(payload.diffData));
    // eslint-disable-next-line no-underscore-dangle
    this._tradeDataService._orders = payload.currentOrders;
    // this.localOrders = payload.currentOrders;
    // console.log('eventss => ', payload.diffData);

    // this.pubSub.publish(POST_ADDED_EVENT, { postAdded: payload.currentOrders });
    // TODO: Graphql Change Event

    // console.log('position.update event', payload);

    // TODO: Web socket change event

    // handle and process "OrderCreatedEvent" event
  }

  sleep(wait: number = 1000) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(true);
      }, wait);
    });
  }
}

// class KeyValuePair<T, U> {
//   private key: T;
//   private val: U;

//   setKeyValue(key: T, val: U): void {
//     this.key = key;
//     this.val = val;
//   }

//   display(): void {
//     console.log(`Key = ${this.key}, val = ${this.val}`);
//   }
// }

const POST_ADDED_EVENT = 'postAdded';
