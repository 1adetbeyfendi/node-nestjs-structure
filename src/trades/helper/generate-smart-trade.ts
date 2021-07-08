import axios from 'axios';
import { SmartTradeParams, Position, Leverage, StopLoss, Step } from 'src/trades/helper/commas-repo/types/types';
import { quantityCalculation, roiCalculation, yuzdeDegisim } from 'src/trades/helper/functions/trade.functions';
import { PositionDirectionEnum } from 'src/trades/interfaces/trade.enums';

import {
  CreateTradePositionEnums,
  CreateTradeROEorPriceEnums,
  ICreateCommasSmartTrade,
  ICreateCommasSmartTradeTakeProfit,
  ICreateTradeLeverage,
  ICreateTradePosition,
} from '../interfaces/commas.interface';

export class CreateCommasSmartTrade {
  // smartTradeParams
  public _smartTrade!: SmartTradeParams;
  // iParams
  private _params!: ICreateCommasSmartTrade;

  private _remoteTicker!: {
    bid: any;
    ask: any;
    last: any;
  };

  quantity!: number;

  // constructor() {} // public httpService: HttpService, // @Inject(forwardRef(() => HttpService))

  // public async create() {}

  // eslint-disable-next-line sonarjs/cognitive-complexity
  public async build(params: ICreateCommasSmartTrade): Promise<SmartTradeParams> {
    // eslint-disable-next-line no-useless-catch
    try {
      // eslint-disable-next-line no-underscore-dangle
      this._params = params;

      this._remoteTicker = await this.getRemoteTicker();

      //#region  position
      const position = this._setPosition(this._params.position);

      if (position.status && position.data !== undefined) {
        this._smartTrade = {
          account_id: this._params.accountId,
          pair: this._params.symbol,
          note: '',
          instant: false,
          skip_enter_step: false,
          position: position.data,
        };
      } else {
        throw new Error(`stopLossData generate error ${position.msg}`);
      }
      //#endregion

      //#region Kaldırcaç
      const kaldirac = this._setKaldirac(this._params.leverage);

      if (kaldirac.status && kaldirac.data !== undefined) {
        this._smartTrade.leverage = kaldirac.data;
      } else {
        throw new Error(`stopLossData generate error ${position.msg}`);
      }

      //#endregion

      //#region TakeProfit

      if (this._params.takeProfit_status && this._params.takeProfit !== undefined) {
        const takeProfit = this._setTakeProfit(this._params.takeProfit);

        if (takeProfit.status) {
          this._smartTrade.take_profit = {
            enabled: true,
            steps: takeProfit.data,
          };
        } else {
          throw new Error(`takeprofit generate error ${takeProfit.msg}`);
        }
      } else {
        this._smartTrade.take_profit = {
          enabled: false,
        };
      }

      //#endregion

      //#region StopLoss

      if (this._params.stopLoss_status && this._params.stopLoss !== undefined) {
        // this.smartTrade.stop_loss = {
        //   enabled : true
        // }

        const stopLossData = this._setStopLoss(this._params.stopLoss);

        if (stopLossData.status && stopLossData.data !== undefined) {
          this._smartTrade.stop_loss = stopLossData.data;
        } else {
          throw new Error(`stopLossData generate error ${stopLossData.msg}`);
        }
      } else {
        this._smartTrade.stop_loss = {
          enabled: false,
        };
      }

      //#endregion

      return this._smartTrade;
    } catch (error) {
      throw error;
    }
  }

  // Pozisyon Ayarları
  private _setPosition(position: ICreateTradePosition) {
    try {
      switch (position.positionType) {
        case CreateTradePositionEnums.BALANCE: // kullanıcının kasasında ki müsait balance
          // TODO: kullanıcının müsait balancesi gelecek
          break;
        case CreateTradePositionEnums.QUANTITY: // kullanıcı tarafından gelen quantity
          this.quantity = position.value;
          break;

        case CreateTradePositionEnums.USDT: // kullanıcnın verdiği belirlediği usdt
          this.quantity = quantityCalculation(this._params.leverage.value, position.value, this._remoteTicker.ask);
          break;

        default:
          throw new Error('CreateTradePositionEnums');
          break;
      } // switch end

      const positionResponse: Position = {
        order_type: position.order_type,
        type: position.position === PositionDirectionEnum.LONG ? 'buy' : 'sell',
        units: {
          value: this.quantity,
        },
      };
      return { status: true, msg: '', data: positionResponse };
    } catch (error) {
      return { status: false, msg: error, data: undefined };
    }
  } // set position End

  // set Kaldıraç
  private _setKaldirac(leverage: ICreateTradeLeverage) {
    try {
      // let kaldirac: Leverage | undefined = undefined;

      if (!leverage.enabled) {
        // undefined gelirse kaldıraç yok demek
        return { status: true, msg: '', data: undefined };
      }
      const leverageResponse: Leverage = {
        enabled: true,
        type: leverage.type,
        value: leverage.value,
      };
      return { status: true, msg: '', data: leverageResponse };
    } catch (error) {
      return { status: false, msg: error, data: undefined };
    }
  }

  // init StopLoss
  private _setStopLoss(stoplossData: ICreateCommasSmartTradeTakeProfit) {
    /*
      stop_loss: {
          enabled: true,
          order_type: "market",
          price: {
            value: stopLoss,
          },

          conditional: {
            price: {
              type: "last",
              value: stopLoss,
              // percent: commasTrailing
            },
            trailing: {
              enabled: true,
              percent: commasTrailing,
            },
          },
        },
      */

    try {
      let stopLossPrice = 0;
      switch (stoplossData.price_type) {
        case CreateTradeROEorPriceEnums.PRICE:
          // this._remoteTicker.last
          stopLossPrice = stoplossData.value;
          // calcStopLoss = yuzdeDegisim(stopLoss, last);
          break;
        case CreateTradeROEorPriceEnums.ROE:
          stopLossPrice = roiCalculation({
            ROE: stoplossData.value, // roe ye göre hesap örn : -10
            entryPrice: this._remoteTicker.last, // ask long için - last short için
            leverage: this._params.leverage.value, // kaldiracç
            positionDirection: this._params.position.position, // long or short
          });
          break;

        default:
          throw new Error('_setStopLoss default not working');

          break;
      } // switch End

      let stopLossYuzde;

      if (stoplossData.trailing_status && stoplossData.trailing_percent !== undefined) {
        // custom trailing yuzdesi

        const customTrailing = roiCalculation({
          ROE: stoplossData.value, // roe ye göre hesap örn : -10
          entryPrice: this._remoteTicker.last, // ask long için - last short için
          leverage: this._params.leverage.value, // kaldiracç
          positionDirection: this._params.position.position, // long or short
        });

        const stopYuzde = yuzdeDegisim(customTrailing, this._remoteTicker.last);

        stopLossYuzde = stopYuzde;
      } else {
        stopLossYuzde = yuzdeDegisim(stopLossPrice, this._remoteTicker.last);
        // normal stopLoss
      }

      const stoplossTrade: StopLoss = {
        enabled: true,
        order_type: stoplossData.order_type,
        price: {
          value: stopLossPrice,
        },
        conditional: {
          price: {
            type: stoplossData.type,
            value: stopLossPrice,
          },
          trailing: {
            enabled: stoplossData.trailing_status,
            percent: stopLossYuzde,
          },
        },

        // price :
      };

      return { status: true, msg: '', data: stoplossTrade };
    } catch (error) {
      return { status: false, msg: error, data: undefined };
    }
  }

  private _setTakeProfit(takeProfitDatas: ICreateCommasSmartTradeTakeProfit[]) {
    try {
      const steps: Step[] = [];

      takeProfitDatas.map((takeProfitData) => {
        //
        const stepData = this._generateStep(takeProfitData);
        steps.push(stepData);
      });

      return { status: true, msg: '', data: steps };
    } catch (error) {
      return { status: false, msg: error, data: undefined };
    }
  }

  private _generateStep(takeProfitData: ICreateCommasSmartTradeTakeProfit) {
    // let step: Step;

    let takeProfitPrice = 0;
    switch (takeProfitData.price_type) {
      case CreateTradeROEorPriceEnums.PRICE:
        // this._remoteTicker.last
        takeProfitPrice = takeProfitData.value;

        // calcStopLoss = yuzdeDegisim(stopLoss, last);
        break;
      case CreateTradeROEorPriceEnums.ROE:
        takeProfitPrice = roiCalculation({
          ROE: takeProfitData.value, // roe ye göre hesap örn : -10
          entryPrice: this._remoteTicker.last, // ask long için - last short için
          leverage: this._params.leverage.value, // kaldiracç
          positionDirection: this._params.position.position, // long or short
        });
        break;

      default:
        throw new Error('_generateStep default not working');

        break;
    } // switch End

    const step: Step = {
      order_type: takeProfitData.order_type,
      price: {
        type: takeProfitData.type,
        value: takeProfitPrice,
      },
      volume: takeProfitData.volume || 100,

      // trailing : {
      //   enabled : takeProfitData.trailing_status,
      // }
    }; // step end

    if (takeProfitData.trailing_status) {
      const trailingPercentCalc = roiCalculation({
        ROE: takeProfitData.trailing_percent || takeProfitData.value, // roe ye göre hesap örn : -10
        entryPrice: this._remoteTicker.last, // ask long için - last short için
        leverage: this._params.leverage.value, // kaldiracç
        positionDirection: this._params.position.position, // long or short
      });

      const trailingPercentYuzde = yuzdeDegisim(this._remoteTicker.last, trailingPercentCalc);
      if (trailingPercentYuzde < 1) {
        throw new Error("Trailing yuzde 1'den düşük olamaz..");
      }
      step.trailing = {
        enabled: true,
        percent: trailingPercentYuzde,
      };
    } else {
      step.trailing = {
        enabled: false,
      };
    }

    return step;
  }

  // TODO:  socket bağlanacak gecikme için
  private async getRemoteTicker() {
    // axios.get()

    const responses = await axios.get(
      `https://3commas.io/currency_rates?type=Account%3A%3ABinanceFuturesAccount&pair=${this._params.symbol}`,
    );

    const { bid, ask, last } = responses.data;

    return { bid, ask, last };
  }
}
