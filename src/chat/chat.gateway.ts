import { MyLogger } from './../common/my-logger.service';
import { JwtPayload } from './../auth/auth.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { ReqUser } from 'src/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MyOrder } from 'src/gql/models/positions.model';
import { ChatService } from 'src/chat/chat.service';

export class MySocketClients {
  JwtPayload: JwtPayload = null;

  socket: Socket;

  /**
   *
   */
  constructor(socket: Socket, jwt: JwtPayload = null) {
    // super();
    // this.socket = socket;
  }
}
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new MyLogger(ChatGateway.name);

  @WebSocketServer() server: Server;
  users: number = 0;

  /**
   *
   */
  constructor(private jwtService: JwtService, public chatService: ChatService) {
    // chatService.setClient(this.server);
    // super();
    // console.log(this.server);
    // socketioJwt.authorize({
    //   secret: '',
    // });
    // this.server.on('connection', (asd) => {
    //   socketioJwt.authorize({
    //     secret: '',
    //     timeout: 15000, // 15 seconds to send the authentication message
    //   });
    // });
    // this.server.on('connection').on('authenticated', function (socket) {
    //   //this socket is authenticated, we are good to handle more events from it.
    //   console.log(`Hello! ${socket.decoded_token.name}`);
    // });
  }
  private _getTokenPayload(client: Socket): Promise<JwtPayload> {
    return new Promise((resolve, reject) => {
      const token = client.handshake.query.token;
      if (token) {
        const payload = this.jwtService.decode(token.toString());
        console.log(payload);
        const jwtPayload: JwtPayload = {
          roles: payload['roles'],
          accId: payload['accId'],
          id: payload['id'],
          sub: '',
          username: payload['username'],
        };
        return resolve(jwtPayload);
      } else {
        return reject(null);
      }
    });
  }
  async handleConnection(client: Socket) {
    // A client has connected

    try {
      const token = await this._getTokenPayload(client);
      this.chatService.addActiveUser(token);
    } catch (error) {
      client.disconnect();
    }

    // this.users++;
    // console.log('client', this.users);

    // // Notify connected clients of current users
    // this.server.emit('users', this.users);
  }

  async handleDisconnect(client: Socket) {
    // A client has disconnected
    this.users--;
    const token = await this._getTokenPayload(client);
    this.chatService.removeUser(token);

    // Notify connected clients of current users
    this.server.emit('users', this.users);
  }

 

  // @UseGuards(JwtAuthGuard)
  @SubscribeMessage('chat')
  async onChat(client, message) {
    // console.log('User ==> ', user);

    // console.log('client ==> ', client);
    // console.log('message ==> ', message);

    client.emit('chat', message);
    // client.broadcast.emit('chat', message);
  }

  // TODO: send active user sockets
  @OnEvent('position.update')
  handleOrderCreatedEvent(payload: { currentOrders: MyOrder[] }): void {
    // handle and process "OrderCreatedEvent" event
    // console.log('positionUpdate socket runnnn');

    // this.server.emit(socketUserIdRoom, { position: order });

    this.chatService.activeUsers.forEach(activeUsers => {
      // if(activeUsers.accId){

      // }
      if(payload.currentOrders.length === 0){
        this.server.emit(activeUsers.accId.toString(), { position: [] });
        this.logger.debug(`${activeUsers.accId} send data`)

      }else{ // aktif pozisyonlar kapatıldığı için kapatılışı haber veriyoruz.
        let userOrderss = payload.currentOrders.filter(x => x.account.id === activeUsers.accId)
        if(userOrderss.length > 0){
          this.server.emit(activeUsers.accId.toString(), { position: userOrderss });
          this.logger.debug(`${activeUsers.accId} send data`)
        }
      }
   
      
    })
    // payload.currentOrders;
    // payload.currentOrders.forEach((order) => {
    //   const searchUserIndex = this.chatService.activeUsers.findIndex((x) => x.accId === order.account.id);
    //   if (searchUserIndex !== -1) {
    //     // send socket
    //     const socketUserIdRoom = this.chatService.activeUsers[searchUserIndex].accId.toString();
    //     this.server.emit(socketUserIdRoom, { position: order });
    //     this.logger.debug(`${socketUserIdRoom} send data`)
    //   } else {
    //     // console.log('');
    //   }
    // });

    // if(_.findIndex(payload.currentOrders,{  })){

    // }
  }
}
