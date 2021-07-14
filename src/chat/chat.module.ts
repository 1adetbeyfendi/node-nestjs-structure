import { JwtModule } from '@nestjs/jwt';
import { ChatGateway } from './chat.gateway';
import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthModule } from 'src/auth';

@Module({
  imports: [AuthModule],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
