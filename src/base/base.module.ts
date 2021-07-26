// import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMarkets, UsersPermissionsUser } from 'src/entity/strapi';

import { AuthModule } from '../auth';
import * as controllers from './controllers';

@Module({
  imports: [
    TerminusModule,
    AuthModule,

    // HttpModule.register({
    //   timeout: 3000,
    //   maxRedirects: 2,
    // }),
    TypeOrmModule.forFeature([UsersPermissionsUser, UserMarkets]),
  ], // Authentication
  controllers: Object.values(controllers),
})
export class BaseModule {}
