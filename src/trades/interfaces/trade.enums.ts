export enum PositionDirectionEnum {
  LONG = 'LONG',
  SHORT = 'SHORT',
}

export enum MarginTypeEnum {
  ISOLATED = 'ISOLATED',
  CROSSED = 'CROSSED',
}

export enum MarketTypeEnum {
  MARKET = 'MARKET',
  LIMIT = 'LIMIT',
}
// bid|ask|last
export enum OrderBookTypeEnum {
  BID = 'bid',
  ASK = 'ask',
  LAST = 'last',
}
export interface RoiCalculationModel {
  // var response = new RoiCalculationModel
  // {
  //   InitialMargin = initalMargin,
  //   Pnl = pnl,
  //   Roe = roe
  // };

  // return response;

  InitialMargin: number;
  Pnl: number;
  Roe: number;
}

export interface IRoeCalculation {
  ROE: number;
  leverage: number;
  positionDirection: PositionDirectionEnum;
  entryPrice: number;
}
