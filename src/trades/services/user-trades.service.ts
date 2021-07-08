/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Interval } from '@nestjs/schedule';
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
    public tradeCommasService: TradeCommasService,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    private _tradeDataService: TradeDataService,
    private eventEmitter: EventEmitter2,
    private readonly configService: ConfigService,
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
  ) {
    // super();
    this.api = tradeCommasService.generateApi();
    // eventEmitter.emit('position.service.status', { status: true });
  }

  // @Interval('user-trade', 1000)
  // eslint-disable-next-line @typescript-eslint/member-ordering
  // eslint-disable-next-line @typescript-eslint/typedef
  private _running: boolean = false;

  @Interval('user-trade', 3000)
  async checkRemote() {
    // console.log('user-trade-1000, working fetch');

    // TODO: remote Fetch Positions
    // TODO: diff localposition and remote position
    // TODO: Event PositionChange
    // console.log('asdfasdfasdg');
    // await sleep(5000);
    if (this.configService.get<boolean>('commas.autoFetch')) {
      if (!this._running) {
        this._running = true;
        // await sleep(5000);
        const positions = await this.api.getSmartTradeHistory({
          status: 'active',
        });
        // if (this.localOrders.length == 0 && positions.length !== 0) {
        //   this.localOrders = positions;
        // }
        this.logger.log('remote.commas.check.complete');
        // this.lastCheck = Date.now();
        const diff = _.difference(positions, this.localOrders);
        // console.log('positions : ', positions);
        // console.log('local Position : ', this.localOrders);
        // console.log('diff : ', diff);

        // console.log(diff);
        if (diff.length > 0) {
          // değişklik Var Demektir
          this.eventEmitter.emit('position.update', {
            diffData: diff,
            currentOrders: positions,
          });
          // this.pubSub.publish(POST_ADDED_EVENT, { postAdded: payload.currentOrders });
        } else {
          // değişiklik yok
        }
        // this.logger.debug(diff);
        this._running = false;
      } else {
        this.logger.debug('cron çalıştığından dolayı remote position not run ');
      }
    }
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
  handleOrderCreatedEvent(payload: { diffData: MyOrder[]; currentOrders: MyOrder[] }): void {
    this.logger.log('position.update event', JSON.stringify(payload.diffData));
    // eslint-disable-next-line no-underscore-dangle
    this._tradeDataService._orders = payload.currentOrders;
    this.localOrders = payload.currentOrders;
    console.log(payload.currentOrders);

    // this.pubSub.publish(POST_ADDED_EVENT, { postAdded: payload.currentOrders });
    // TODO: Graphql Change Event

    // console.log('position.update event', payload);

    // TODO: Web socket change event

    // handle and process "OrderCreatedEvent" event
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
