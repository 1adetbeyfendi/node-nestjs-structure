import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth';
import { Role, Roles } from 'src/common';
import { API } from 'src/trades/helper/commas-repo';
import { TradeCommasService } from 'src/trades/services/trade-commas.service';
import { TradesService } from 'src/trades/services/trades.service';

@Controller('trade-user')
@ApiTags('trade-user')
@UseGuards(JwtAuthGuard)
@Roles(Role.Auth)
@ApiBearerAuth()
export class TradeUserController {
  api: API;
  constructor(private readonly tradesService: TradesService, private readonly commasService: TradeCommasService) {
    this.api = commasService.api;
  }

  @Get('me')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async getMe() {
    let data = await this.api.getAccountInfo();
    
    if(data["api_key"]){
      delete data["api_key"] 
    }
    return data;
  }

  @Get('accounts')
  getAccounts() {
    return this.api.getExchange();
  }
}
