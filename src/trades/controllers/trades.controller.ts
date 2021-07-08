import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { API } from 'src/trades/helper/commas-repo';
import { TradeCommasService, TradesService } from 'src/trades/services';
import { CreateTradeDto } from 'src/trades/dto/create-trade.dto';
import { JwtAuthGuard } from 'src/auth';
import { User } from 'src/shared/user';
import { ReqUser, Role, Roles, RolesGuard } from 'src/common';

@UseGuards(JwtAuthGuard, RolesGuard)
// @UseGuards(RolesGuard)

@Roles(Role.Auth)
// @SetMetadata('roles', [Role.Auth])
@ApiBearerAuth()
// @Controller()
@ApiTags('trades')
@Controller('trades')
export class TradesController {
  api: API;
  constructor(private readonly tradesService: TradesService, private readonly commasService: TradeCommasService) {
    this.api = commasService.generateApi();
  }

  //#region  crud

  @Post()
  async create(@Body() createTradeDto: CreateTradeDto) {
    const order = await this.commasService.generateSmartTrade(createTradeDto);
    // await this.api.smartTrade(order);
    return order;
    // TODO: Başarılı olursa store atılacak
    // return this.tradesService.create(createTradeDto);
  }

  // @Get()
  // findAll() {
  //   return this.tradesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tradesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTradeDto: UpdateTradeDto) {
  //   // return this.tradesService.update(+id, updateTradeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   // return this.tradesService.remove(+id);
  // }

  //#endregion

  //#region  trades

  @Get('history')
  getHistory(@ReqUser() user) {
    console.log(user);

    return this.api.getSmartTradeHistory();
  }

  @Get('actives')
  getActivesTrades(@ReqUser() user: User) {
    console.log(user);

    return this.api.getSmartTradeHistory({
      status: 'active',
      account_id: user.accId,
    });
  }
  @Get(':id/status')
  getTradeStatus(@Param('id') id: number) {
    return this.api.getSmartTrade(id);
  }

  // ad fund
  @Post(':id/add-fund')
  addFundTrade(@Param('id') id: number) {
    // return this.api.getSmartTrade(id);
  }

  @Get(':id/close-by-market')
  closeByMarket(@Param('id') id: number) {
    // return this.api.getSmartTrade(id);
    return this.api.closeSmartTrade(id);
  }

  // close

  //#endregion
}
