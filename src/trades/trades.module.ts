import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';

import * as controllers from './controllers';
import * as services from './services';

@Module({
  controllers: Object.values(controllers),
  imports: [ConfigModule],
  providers: Object.values(services),
  exports: Object.values(services),
})
export class TradesModule {}
