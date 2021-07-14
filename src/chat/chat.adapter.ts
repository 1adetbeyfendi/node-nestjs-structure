// import { IoAdapter } from '@nestjs/platform-socket.io';

// import { Server } from 'socket.io';
// import { createAdapter } from 'socket.io-redis';
// import { RedisClient } from 'redis';

import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { RedisClient } from 'redis';
import { Server } from 'socket.io';
import { createAdapter } from 'socket.io-redis';

export class RedisIoAdapter extends IoAdapter {
  /**
   *
   */
  // constructor(public  app: INestApplicationContext) {
  //   super();
  //   // this.
  // }
  createIOServer(port: number, options?: any): any {
    // const server = super.createIOServer(port, options);

    // // const io = new Server(port, options);
    // // const redisAdapter = redisIoAdapter({ host: 'localhost', port: 6379 });
    // console.log(server);

    // const pubClient = new RedisClient({ host: 'localhost', port: 6379 });
    // const subClient = pubClient.duplicate();

    // server.adapter(createAdapter({ pubClient, subClient }));
    // // server.adapter(createAdapter({}));

    // return server;
    let customizeOptions = {
      ...options,
      cors: {
        origin: '*',
      }
    };

    // console.log('optionsss =>>> ', customizeOptions);

    const server: Server = super.createIOServer(port, customizeOptions);

    // server.of('/chatroom').use(async (socket, next) => {
    //   try {
    //     const token = socket.handshake.query.token;
    //     const payload = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    //     socket.user_id = payload.user_id;
    //     next();
    //   } catch (err) {
    //     next(err);
    //   }
    // });

    const pubClient = new RedisClient({ host: 'localhost', port: 6379 });
    const subClient = pubClient.duplicate();

    server.adapter(createAdapter({ pubClient, subClient }));
    // server.use(
    //   socketioJwt.authorize({
    //     secret: '8940d87d-c82c-4ae0-be5d-cd770487074c',
    //     handshake: true,
    //     auth_header_required: true,
    //   }),
    // );

    return server;
  }
}
