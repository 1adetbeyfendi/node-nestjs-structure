/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/typedef */
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { API } from 'src/trades/helper/commas-repo';
import { SmartTradeParams } from 'src/trades/helper/commas-repo/types/types';
import { CreateCommasSmartTrade } from 'src/trades/helper/generate-smart-trade';
import { ICreateCommasSmartTrade } from 'src/trades/interfaces/commas.interface';

import { CommasUserDataDTO } from '../interfaces/ICommasAccounts.interface';

@Injectable()
export class TradeCommasService {
  /**
   *
   */

  private _api: API = null;
  public get api(): API {
    if (this._api === null) {
      this._api = this.generateApi();
    }
    return this._api;
  }
  // public set api(v: API) {
  //   this._api = v;
  // }

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    // private createSmartTradeService: CreateCommasSmartTrade, // @Inject(forwardRef(() => CreateCommasSmartTrade))
    // super();
  }

  generateApi(
    key = '88506c64f8204cc5b1dc99e9dd72aab05b8129911b8040929603136105719f6e',
    secret = 'a7026c6378cf594d9d1f4cd11f1b0fe2d34a521917ecda6156f83bb6e8623b607bfb08671ea203e340634e0f34665c5543b8e375c892fb32b363938e52ef66c7d16bde244ce61e7b697dcbcdbb7dce451a2a13009d885c1acc773a0b50855d8008cef74a',
  ) {
    return new API({
      key: key, // Optional if only query endpoints with no security requirement
      secrets: secret, // Optional
      timeout: 60000, // Optional, in ms, default to 30000
      // errorHandler: (response, reject) => {
      //   // Optional, Custom handler for 3Commas error
      //   // eslint-disable-next-line @typescript-eslint/naming-convention
      //   const { error, error_description } = response;

      //   console.log(response);

      //   reject(new Error(error_description ?? error));
      // },
    });
  }

  async getUsers(): Promise<CommasUserDataDTO[]> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._api.getExchange();
  }

  async generateSmartTrade(params: ICreateCommasSmartTrade) {
    const trade = new CreateCommasSmartTrade();
    return trade.build(params);

    // const pair = 'USDT_SAND';
    // const tradeParams: ICreateCommasSmartTrade = {
    //   accountId: 30431407,
    //   symbol: pair,
    //   position: {
    //     order_type: 'market',
    //     positionType: CreateTradePositionEnums.USDT,
    //     value: 15,
    //     position: PositionDirectionEnum.LONG,
    //   },
    //   leverage: {
    //     enabled: true,
    //     type: 'isolated',
    //     value: 5,
    //   },
    //   stopLoss_status: true,
    //   stopLoss: {
    //     order_type: 'market',
    //     price_type: CreateTradeROEorPriceEnums.ROE,
    //     type: 'last',
    //     value: -10, // stop roe'ye göre
    //     trailing_status: true,
    //     trailing_percent: -10, // takip trailingi
    //   },
    //   takeProfit_status: true,
    //   takeProfit: [
    //     {
    //       order_type: 'market',
    //       price_type: CreateTradeROEorPriceEnums.ROE,
    //       trailing_status: false,
    //       type: 'last', // TODO: shortsa bid kullanılır
    //       value: 10,
    //       volume: 50,
    //     },
    //     {
    //       order_type: 'market',
    //       price_type: CreateTradeROEorPriceEnums.ROE,
    //       trailing_status: true,
    //       type: 'last',
    //       value: 20,
    //       trailing_percent: 10,
    //       volume: 50,
    //     },
    //   ],
    //   note: '',
    // };
  }
  async createSmartTrade(order: SmartTradeParams) {
    try {
      const orderResponse = await this.api.smartTrade(order);
      console.log("orderResponse==>",orderResponse);
      
      if (orderResponse.status.type !== 'failed') {
        // TODO: user msg
        return orderResponse;
      } else {
        throw orderResponse.status;
      }
      // if(orderResponse.status.type === 'idl'){

      // }
    } catch (error) {
      console.log("orderResponseError==>",error);

      // return error;
      throw error;

    }
  }
  // public async
}
