import { RolesGuard } from './../../common/guards/roles.guard';
import { Controller, Get, Param, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth';
import { Role, Roles } from 'src/common';
import { API } from 'src/trades/helper/commas-repo';
import { TradesService, TradeCommasService } from 'src/trades/services';
import express from 'express';
import axios from 'axios';
import { ErrorResponseException } from 'src/common/exceptions/error-reponse.exception';

@Controller('exchange')
@ApiTags('exchange')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Auth)
@ApiBearerAuth()
export class ExchangeController {
  public api: API;
  constructor(private readonly tradesService: TradesService, private readonly commasService: TradeCommasService) {
    this.api = commasService.api;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  @Get()
  getExchanges(): any {
    return this.api.getExchange();
  }

  @Get('pairs/:code')
  getPairs(@Param('code') markCode: string): any {
    console.log(markCode);

    return this.api.getMarketPairs({
      // eslint-disable-next-line object-shorthand
      market_code: markCode,
    });
  }

  @Get('currency_rates')
  async getCurrencyRates(@Query('type') param: string = '', @Query('pair') pair: string = '', @Res() res: express.Response) {
    if (param === '' || pair === '') {
      return res.status(400).send({ msg: 'pair or type null' });
    }
    try {
      const commas = await axios.get(`https://3commas.io/currency_rates?type=${param}&pair=${pair}`, {
        headers: {
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'accept-language': 'en,tr-TR;q=0.9,tr;q=0.8,en-US;q=0.7,ro;q=0.6,und;q=0.5',
          'cache-control': 'no-cache',
          pragma: 'no-cache',
          'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
          'sec-ch-ua-mobile': '?0',
          'sec-fetch-dest': 'document',
          'sec-fetch-mode': 'navigate',
          'sec-fetch-site': 'none',
          'sec-fetch-user': '?1',
          'upgrade-insecure-requests': '1',
        },
      });
      // console.log(commas);
      // throw 'err';
      if (commas.status === 200 || commas.status === 201) {
        res.send(commas.data);
      } else {
        new ErrorResponseException(commas.data, 400, 'remote_currency_rates_fetch_error', res).send();
      }
    } catch (error) {
      // console.log(typeof error);

      new ErrorResponseException(error, 400, 'CMMS-CR-400', res).send();
    }
  }

  @Get('limits')
  async getLimits(@Query('type') type: string = '', @Query('pair') pair: string = '', @Res() res: express.Response) {
    
    try {

      if (type === '' || pair === '') {
        return res.status(400).send({ msg: 'pair or type null' });
      }
      // TODO: Remote Limits Redis save siparişi oluştururken check edeceğin için kontrol etmek gerekiyor

      const commas = await axios.get(`https://3commas.io/accounts/limits?pair=${pair}&type=${type}`, {
        headers: {
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'accept-language': 'en,tr-TR;q=0.9,tr;q=0.8,en-US;q=0.7,ro;q=0.6,und;q=0.5',
          'cache-control': 'no-cache',
          pragma: 'no-cache',
          'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
          'sec-ch-ua-mobile': '?0',
          'sec-fetch-dest': 'document',
          'sec-fetch-mode': 'navigate',
          'sec-fetch-site': 'none',
          'sec-fetch-user': '?1',
          'upgrade-insecure-requests': '1',
        },
      });
      // console.log(commas);
      // throw 'err';
      if (commas.status === 200 || commas.status === 201) {
        res.send(commas.data);
      } else {
        new ErrorResponseException(commas.data, 400, 'remote_currency_rates_fetch_error', res).send();
      }
    } catch (error) {
      // console.log(typeof error);

      new ErrorResponseException(error, 400, 'CMMS-CR-400', res).send();
    }
  }
}
