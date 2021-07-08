import { PositionsResolver } from './resolvers/positions.resolver';
import { TradesModule } from './../trades/trades.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Sampletable1 } from '../entity/sampledb1';
import { SimpleService } from './providers';
import { SimpleResolver } from './resolvers';
import { DateScalar } from './scalars';
import { join } from 'path';


/**
 * https://docs.nestjs.com/graphql/quick-start
 */
@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useFactory: (config: ConfigService, AuthService) => ({
        sortSchema: true,
        installSubscriptionHandlers: true,
        autoSchemaFile: join(process.cwd(), 'schema.gql'),

        // typePaths: ['./**/*.graphql'],
        // resolvers: { JSON: GraphQLJSON },

        // resolvers: [
        //   { JSON: GraphQLJSON },
        //   // { null: GraphQLJSON },

        // ]
        // https://github.com/nestjs/docs.nestjs.com/issues/394
        context: ({ req, connection }) => {
          // console.log("req", req);
          // console.log("connection" ,connection);

          return connection
            ? {
                req: { headers: connection.context },
              }
            : { req };
        },

        ...config.get('graphql'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Sampletable1]),
    // Trade Moduke
    TradesModule,
  ],
  providers: [SimpleResolver, SimpleService, DateScalar, PositionsResolver],
})
export class GqlModule {}
