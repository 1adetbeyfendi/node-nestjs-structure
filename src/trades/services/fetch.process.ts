import { TradeQueqeService } from './trade-queqe.service';
import { Processor, Process, OnQueueCompleted } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { MyLogger } from 'src/common/my-logger.service';

@Processor('fetch')
export class FetchConsumer {
  /**
   *
   */
  constructor(private tradeQueqeService: TradeQueqeService) {
    // super();
  }

  private readonly logger = new MyLogger(FetchConsumer.name);

  // @Process('transcode')
  @Process({
    name: 'userTradeFetch',
    concurrency: 5,
  })
  async handleTranscode(job: Job) {
    // this.logger.debug('Start transcoding...');
    // this.logger.debug(job.data);
    // throw new Error("");
    try {
      this.logger.log('process Starting ');
      // const userId = job.data.userId;

      // this.logger.debug(`${userId} start process`);
      await this.tradeQueqeService.TradeQueqeProcessor();
      // await this.binanceQueqeService.processUser(userId);
      // this.logger.debug(`${userId} complete process`);
    } catch (error) {
      this.logger.error(`process işlenirken bir hata oluştu ${JSON.stringify(error)}`);
    }
  }
  @OnQueueCompleted({
    name: 'userTradeFetch',
  })
  async completeJobFetch(job: Job, result: any) {
    this.logger.log(`---> ${job.id} complete jobbbbb`);
    // console.log('jobid => ', job.id, 'result => ', result);
  }
}
