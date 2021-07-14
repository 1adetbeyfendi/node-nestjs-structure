import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from 'nest-router';

import { AwsModule } from './aws';
import { BaseModule } from './base';
import { CommonModule, ExceptionsFilter, LoggerMiddleware, PubSubModule } from './common';
import { configuration } from './config';
import { GqlModule } from './gql';
import { SampleModule } from './sample';
import { TradesModule } from './trades/trades.module';
import { ChatModule } from './chat/chat.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // Configuration
    // https://docs.nestjs.com/techniques/configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // Database
    // https://docs.nestjs.com/techniques/database
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        entities: [`${__dirname}/entity/**/*.{js,ts}`],
        subscribers: [`${__dirname}/subscriber/**/*.{js,ts}`],
        migrations: [`${__dirname}/migration/**/*.{js,ts}`],
        synchronize: false,
        //...config.get('db'),
        type: "sqlite",
        database: 'F:/DEVELOPER/repos/GIT/cryptobot/strapi_crypto/.tmp/data.db',
        logging: true,
      }),
      inject: [ConfigService],
    }),
    // Static Folder
    // https://docs.nestjs.com/recipes/serve-static
    // https://docs.nestjs.com/techniques/mvc
    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/../public`,
      renderPath: '/',
    }),
    // Module Router
    // https://github.com/nestjsx/nest-router
    RouterModule.forRoutes([
      {
        path: 'aws',
        module: AwsModule,
      },
      // {
      //   path: 'test',
      //   module: SampleModule,
      // },
    ]),
    // Service Modules
    CommonModule, // Global
    BaseModule,
    // SampleModule,
    AwsModule,
    // GqlModule,
    TradesModule,
    // PubSubModule,
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    ChatModule,
    UserModule,
    // JwtModule.registerAsync({
    //   inject: [ConfigService],

    //   useFactory: (configService: ConfigService) => ({
    //     secret: configService.get<string>('JWT_SECRET'),
    //     signOptions: { expiresIn: '60s' },

    //   }),
    // }),
  ],
  providers: [
    // Global Guard, Authentication check on all routers
    // { provide: APP_GUARD, useClass: AuthenticatedGuard },
    // Global Filter, Exception check
    { provide: APP_FILTER, useClass: ExceptionsFilter },
  ],
})
export class AppModule implements NestModule {
  // Global Middleware, Inbound logging
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
