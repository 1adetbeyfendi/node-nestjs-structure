/* eslint-disable prefer-const */

import {
  IRoeCalculation,
  PositionDirectionEnum,
} from 'src/trades/interfaces/trade.enums';

export function roiCalculation(e: IRoeCalculation) {
  let t = e.ROE, // Roe
    r = e.leverage, // Kaldıraç
    n = e.positionDirection, // Long or Short
    i = t / 100 / r; // roe / 100 / kaldıraç
  return e.entryPrice * (i = n === PositionDirectionEnum.LONG ? i + 1 : 1 - i);
}

export function quantityCalculation(
  leverage: number,
  amount: number,
  asset_price: number,
) {
  return (amount * leverage) / asset_price;
}

export function yuzdeDegisim(a: number, b: number) {
  // const a = 0.1950
  // const b = 0.1911
  const sonuc = ((b - a) / b) * 100;
  // console.log(sonuc);

  return sonuc;
}
