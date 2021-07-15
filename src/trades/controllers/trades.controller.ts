import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata, Res } from '@nestjs/common';
import { API } from 'src/trades/helper/commas-repo';
import { TradeCommasService, TradesService } from 'src/trades/services';
import { CreateTradeDto } from 'src/trades/dto/create-trade.dto';
import { JwtAuthGuard, JwtPayload } from 'src/auth';
import { User } from 'src/shared/user';
import { ReqUser, Role, Roles, RolesGuard } from 'src/common';
import { ICreateCommasSmartTrade } from 'src/trades/interfaces/commas.interface';
import express from 'express';
import _ from 'lodash';

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
  async create(@Body() createTradeDto: ICreateCommasSmartTrade, @ReqUser() user: JwtPayload, @Res() res: express.Response) {
    // console.log('createTradeDto ==> ', createTradeDto);
    // console.log('user ==>', user);
    // TODO: multi hesaplar için kullanıdan gelecke accountid yapılacak
    createTradeDto.accountId = user.accId;

    // try {

    // } catch (error) {}
    try {
      const order = await this.commasService.generateSmartTrade(createTradeDto);
      // console.log(order);

      const orderResponse = await this.commasService.createSmartTrade(order);

      res.send(orderResponse);
    } catch (error) {
      console.log(error);

      res.status(400).send({ msg: 'hata oluştu', data: error });
    }

    // return order;
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
  @Post('view')
  async createView(@Body() createTradeDto: ICreateCommasSmartTrade, @ReqUser() user: JwtPayload, @Res() res: express.Response) {
    createTradeDto.accountId = user.accId;

    // try {

    // } catch (error) {}
    try {
      const order = await this.commasService.generateSmartTrade(createTradeDto);
      // console.log(order);

      // const orderResponse = await this.commasService.createSmartTrade(order);

      res.send(order);
    } catch (error) {
      console.log(error);

      res.status(400).send({ msg: 'hata oluştu', data: error });
    }
  }
  @Get('history')
  async getHistory(@ReqUser() user, @Res() res: express.Response) {
    console.log(user);

    let demo = await this.api.getSmartTradeHistory();
    const filterResponse = demo.filter(x => {
      return x.status.type !== 'waiting_targets'
    })

    // let response = demo.splice(0, 1);
    // demo.splice(_.random(2), 1);
    // let response = _.remove(demo,(n)=> {
    //   return n.pair === 'USDT_BLZ'
    // })
    res.send(filterResponse);
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
    console.log(id);

    return this.api.closeSmartTrade(id);
  }

  // close

  //#endregion
}
