export enum PositionDirectionEnum {
  LONG = 'LONG',
  SHORT = 'SHORT',
}

export enum CreateTradePositionEnums {
  BALANCE = 'QUANTITY', // toplam bakiyenin
  USDT = 'USD', // dolar cinsinden
  QUANTITY = 'QUANTITY', // miktar
}

export enum CreateTradeROEorPriceEnums {
  ROE = 'ROE', // toplam bakiyenin
  PRICE = 'PRICE', // dolar cinsinden
}

export enum OrderTypeEnums {
  MARKET = 'market',
  LIMIT = 'limit',
}
export interface ICreateTradePosition {
  position: PositionDirectionEnum; // long - short
  positionType: CreateTradePositionEnums;

  value: number; // Position tipine göre kullanmak için
  limitBuy?: number; // limitBuy akfitse fiyat için
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
  accountId?: any; // data gönderilince tokenden koyulacak

  leverage: ICreateTradeLeverage; // kaldıraç
  symbol: string; // pair

  position: ICreateTradePosition;
  stopLoss_status: boolean;
  stopLoss?: ICreateCommasSmartTradeTakeProfit;

  takeProfit_status: boolean;
  takeProfit?: ICreateCommasSmartTradeTakeProfit[];
  note?: string;
}

/*
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
*/
