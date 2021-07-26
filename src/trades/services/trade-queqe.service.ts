import { MyLogger } from './../../common/my-logger.service';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { MyOrder } from 'src/gql/models/positions.model';
import { Order, PositionStatus } from 'src/trades/helper/commas-repo/types/generated-types';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TradeCommasService } from 'src/trades/services';
import { TradeDataService } from './trade-data.service';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import _ from 'lodash';
import async from 'async';
import axios from 'axios';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class TradeQueqeService {
  logger = new MyLogger(TradeQueqeService.name);
  constructor(
    private configService: ConfigService,
    private tradeService: TradeDataService,
    private commas: TradeCommasService,
    private eventEmitter: EventEmitter2,
    @InjectSentry() private readonly client: SentryService,
    @InjectQueue('fetch') private fetchQueue: Queue,
  ) {}

  async TradeQueqeProcessor() {
    return await async.retry(5, async () => {
      // const CancelToken = axios.CancelToken;
      // const source = CancelToken.source();

      // setInterval(() => {
      //   this.logger.error('3commas api service timeout');
      //   throw new Error('3commas api service timeout');
      //   source.cancel();

      // }, 2000);

      try {
        const positions = await this.commas.api.getSmartTradeHistory({
          // status: 'active',
        });

        const pos = positions.filter((x) => x.status.type === 'waiting_targets');
        // console.log(pos);

        // positions.filter(x => {
        //   x.position.status
        // })

        // console.log(positions)
        // console.log(this.tradeService._orders)
        const diffs = await this.getDiff(pos, this.tradeService._orders);
        if (diffs.news.length > 0 || diffs.deleteds.length > 0) {
          // pozisyonda değişiklik varsa
          // localde ki pozisyon datayı kaydediyorum
          // this.tradeService._orders = positions;

          this.logger.log('değişiklik var');
          this.sendPositionEvent(pos);
        } else {
          this.logger.log('değişiklik yok');
        }
      } catch (error) {
        this.logger.error('3commas remote pozisyon çekilirken bir sorun oluştu ' + JSON.stringify(error));
        this.client.instance().captureException(error);

        throw error;
      }

      // this.tradeService._orders;
    });
  }

  private diffPosition(remoteOrders: Order[], localOrders: MyOrder[]) {
    // const diff = _.isEqual(remoteOrders, localOrders);
    // this.getDiff()
    // return diff;
  }

  getDiff(remoteOrders: Order[], localOrders: MyOrder[]): Promise<Record<'nochanges' | 'news' | 'deleteds', Order[]>> {
    // this.deletedPositions;
    // this.return.
    // this.remotePositions.filter(x => )
    const returns: Record<'nochanges' | 'news' | 'deleteds', MyOrder[]> = {
      deleteds: [],
      news: [],
      nochanges: [],
    };
    return new Promise((resolve, reject) => {
      // returns.nochanges = _.filter(remoteOrders, (x) =>
      //   _.some(localOrders, (y) => x.status.type === y.status.type || ),
      // );
      returns.deleteds = _.filter(
        localOrders,
        // (x) => !_.some(remoteOrders, (y) => x.status.type === y.status.type && x.pair === y.pair && x.profit.roe === x.profit.roe),
        (x) => !_.some(remoteOrders, (y) => x.status.type === y.status.type && x.pair === y.pair && x.profit.roe === y.profit.roe),
      );
      returns.news = _.filter(
        remoteOrders,
        // (x) => !_.some(localOrders, (y) => x.status.type === y.status.type && x.pair === y.pair && x.profit.roe === x.profit.roe),
        (x) => !_.some(localOrders, (y) => x.status.type === y.status.type && x.pair === y.pair && x.profit.roe === y.profit.roe),
      );

      resolve(returns);
    });

    // _.filter()
  }
  private sendPositionEvent(currentOrder: MyOrder[]) {
    // send event

    this.eventEmitter.emit('position.update', {
      // diffData: diff,
      currentOrders: currentOrder,
    });
  }

  // @Interval('user-trade', 1000)
  // eslint-disable-next-line @typescript-eslint/member-ordering
  // eslint-disable-next-line @typescript-eslint/typedef
  private _running: boolean = false;
  // iter_greater = (value: MyOrder[]) => {
  //   value.map((data) => {
  //     return value > 5 ? value : undefined;
  //   });
  // };
  @Interval('user-trade', Number(process.env.COMMAS_RELOAD_TIME) || 3000)
  async checkRemote() {
    // console.log('user-trade-1000, working fetch');

    // TODO: remote Fetch Positions
    // TODO: diff localposition and remote position
    // TODO: Event PositionChange
    // console.log('asdfasdfasdg');
    // await sleep(5000);

    if (this.configService.get<boolean>('commas.autoFetch')) {
      // set queqe

      try {
        const waitingJobs = await this.fetchQueue.count();
        this.logger.debug(waitingJobs);

        if (waitingJobs > 0) {
          this.logger.debug('bekleyen işler var ');
        } else {
          // job ekleniyor
          this.fetchQueue.add(
            'userTradeFetch',
            {
              userId: 'bar',
            },
            {
              jobId: 'fetch-commas',
              attempts: 3,
              removeOnComplete: true,
              timeout: 3000,
            },
          );
        }
      } catch (error) {
        this.logger.error(`commas fetch Error ${JSON.stringify(error)}`);

        // throw error;
      }
    }
  }
}
