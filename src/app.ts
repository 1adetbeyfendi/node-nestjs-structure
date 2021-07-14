import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedisIoAdapter } from 'src/chat/chat.adapter';

import { middleware } from './app.middleware';
import { AppModule } from './app.module';
import { Logger } from './common';

/**
 * https://docs.nestjs.com
 * https://github.com/nestjs/nest/tree/master/sample
 * https://github.com/nestjs/nest/issues/2249#issuecomment-494734673
 */
async function bootstrap(): Promise<void> {
  const isProduction = process.env.NODE_ENV === 'production';
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: isProduction ? false : undefined,
  });
  // https://docs.nestjs.com/techniques/validation
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      transform: true, // transform object to DTO class
    }),
  );

  if (isProduction) {
    app.useLogger(await app.resolve(Logger));
    app.enable('trust proxy');
  }

  // Express Middleware
  middleware(app);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    // .addTag('cats')
    .addBearerAuth({ in: 'header', type: 'http' })
    // .addSecurity('basic', {
    //   type: 'http',
    //   scheme: 'bearer',
    // })
    // .addBearerAuth(
    //   { in: 'header', type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    //   'access-token',
    // )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);



  app.useWebSocketAdapter(new RedisIoAdapter(app));

  await app.listen(process.env.PORT || 3000);
}

// eslint-disable-next-line no-console
bootstrap()
  .then(() => console.log('Bootstrap', new Date().toLocaleString()))
  .catch(console.error);
