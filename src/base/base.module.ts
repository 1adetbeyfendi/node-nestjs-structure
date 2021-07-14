import { HttpModule, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMarkets, UsersPermissionsUser } from 'src/entity/strapi';

import { AuthModule } from '../auth';
import * as controllers from './controllers';

@Module({
  imports: [TerminusModule, AuthModule, HttpModule, TypeOrmModule.forFeature([UsersPermissionsUser, UserMarkets])], // Authentication
  controllers: Object.values(controllers),
})
export class BaseModule {}
