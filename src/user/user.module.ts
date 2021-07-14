import { Module } from '@nestjs/common';
import { TradesModule } from 'src/trades/trades.module';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  imports: [TradesModule]
  
})
export class UserModule {}
