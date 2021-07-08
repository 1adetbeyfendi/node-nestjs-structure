import { RolesGuard } from './../../common/guards/roles.guard';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth';
import { Role, Roles } from 'src/common';
import { API } from 'src/trades/helper/commas-repo';
import { TradesService, TradeCommasService } from 'src/trades/services';

@Controller('exchange')
@ApiTags('exchange')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Auth)
@ApiBearerAuth()
export class ExchangeController {
  public api: API;
  constructor(private readonly tradesService: TradesService, private readonly commasService: TradeCommasService) {
    this.api = commasService.generateApi();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  @Get()
  getExchanges(): any {
    return this.api.getExchange();
  }

  @Get('pairs/:code')
  getPairs(@Param('code') markCode: string): any {
    // console.log(market_code);

    return this.api.getMarketPairs({
      // eslint-disable-next-line object-shorthand
      market_code: markCode,
    });
  }
}
