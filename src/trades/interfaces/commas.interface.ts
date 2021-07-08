import { PositionDirectionEnum } from './trade.enums';

export enum CreateTradePositionEnums {
  BALANCE, // toplam bakiyenin
  USDT, // dolar cinsinden
  QUANTITY, // miktar
}

export enum CreateTradeROEorPriceEnums {
  ROE, // toplam bakiyenin
  PRICE, // dolar cinsinden
}

export enum OrderTypeEnums {
  MARKET = 'market',
  LIMIT = 'limit',
}
export interface ICreateTradePosition {
  position: PositionDirectionEnum; // long - short
  positionType: CreateTradePositionEnums;

  value: number; // Position tipine göre kullanmak için
  order_type: OrderTypeEnums;
}

export interface ICreateTradeLeverage {
  enabled: boolean;
  type?: 'cross' | 'isolated';
  value: number;
}
export interface ICreateCommasSmartTradeTakeProfit {
  order_type: OrderTypeEnums;
  volume?: number;
  price_type: CreateTradeROEorPriceEnums;
  // Roe ise yuzde , price ise price gir
  value: number; // yuzde olarak veya price only
  type: 'bid' | 'ask' | 'last';
  trailing_status: boolean;
  trailing_percent?: number;
}

export interface ICreateCommasSmartTrade {
  accountId: any;

  leverage: ICreateTradeLeverage; // kaldıraç
  symbol: string; // pair

  position: ICreateTradePosition;
  stopLoss_status: boolean;
  stopLoss?: ICreateCommasSmartTradeTakeProfit;

  takeProfit_status: boolean;
  takeProfit?: ICreateCommasSmartTradeTakeProfit[];
  note?: string;
}
