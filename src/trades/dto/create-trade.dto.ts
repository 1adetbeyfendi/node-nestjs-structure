import {
  ICreateCommasSmartTrade,
  ICreateCommasSmartTradeTakeProfit,
  ICreateTradeLeverage,
  ICreateTradePosition,
} from 'src/trades/interfaces/commas.interface';

export class CreateTradeDto implements ICreateCommasSmartTrade {
  accountId: any;
  leverage: ICreateTradeLeverage;
  symbol: string;
  position: ICreateTradePosition;
  stopLoss_status: boolean;
  stopLoss?: ICreateCommasSmartTradeTakeProfit;
  takeProfit_status: boolean;
  takeProfit?: ICreateCommasSmartTradeTakeProfit[];
  note?: string;
}
