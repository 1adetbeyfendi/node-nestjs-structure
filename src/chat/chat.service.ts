import { MyLogger } from './../common/my-logger.service';
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { WebSocketServer } from '@nestjs/websockets';
import _ from 'lodash';
import { Server, Socket } from 'socket.io';
import { JwtPayload } from 'src/auth';
import { MyOrder } from 'src/gql/models/positions.model';

@Injectable()
export class ChatService {
  @WebSocketServer() server: Server;

  /**
   *
   */
  private readonly logger = new MyLogger(ChatService.name);

  //  private server: Server;

  constructor() {
    this.activeUsers = [];
    // super();
    // this.server = client;
  }

  // setClient(server: Server) {
  //   this.server = server;
  // }

  activeUsers: JwtPayload[];

  getActiveUsers() {
    return this.activeUsers;
  }

  addActiveUser(activeUser: JwtPayload) {
    if (this.activeUsers.findIndex((x) => x.accId) === -1) {
      this.activeUsers.push(activeUser);
    }
    this.logger.debug('Kullanıcı  Eklendi => ' + this.activeUsers);
  }

  removeUser(activeUser: JwtPayload) {
    console.log('activeUsers ==> ', this.activeUsers);

    if (this.activeUsers.length > 0) {
      _.remove(this.activeUsers, function (x) {
        return x.accId === activeUser.accId;
      });
      this.logger.debug('Kullanıcı  Silindi => ' + this.activeUsers);
    }

    // const searchIndex = this.activeUsers.findIndex((x) => x.accId);

    // if (searchIndex !== -1) {

    //   // this.activeUsers.(activeUser);
    // }
  }
}
