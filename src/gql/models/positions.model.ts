import { Field, ObjectType, Int } from '@nestjs/graphql';
import {
  Order,
  Account,
  OrderData,
  CurrentPrice,
  Margin,
  PurplePrice,
  PositionPrice,
  PositionStatus,
  Total,
  Units,
  Profit,
  StopLossStatus,
  StepData,
  Leverage,
  Position,
  PositionConditional,
  Trailing,
  StopLoss,
  StopLossConditional,
  StepPrice,
  Timeout,
  TakeProfit,
  Step,
} from 'src/trades/helper/commas-repo/types/generated-types';

@ObjectType({ isAbstract: true })
export class MyOrder implements Order {
  id: number;
  version: number;
  account: MyAccount;
  pair: string;
  instant: boolean;
  status: MyPositionStatus;
  leverage: MyLeverage;
  position: MyPosition;
  take_profit: MyTakeProfit;
  stop_loss: MyStopLoss;
  note: string;
  skip_enter_step: boolean;
  data: MyOrderData;
  profit: MyProfit;
  margin?: MyMargin;
  is_position_not_filled?: boolean;
  editable?: boolean;
}

@ObjectType({ isAbstract: true })
export class MyAccount implements Account {
  id: number;
  type: string;
  name: string;
  market: string;
  link: string;
  class?: string;
}

@ObjectType({ isAbstract: true })
export class MyOrderData implements OrderData {
  editable: boolean;
  current_price: MyCurrentPrice;
  target_price_type: string;
  base_order_finished: boolean;
  @Field((type) => String || Int)
  missing_funds_to_close: string | number;
  liquidation_price?: string;
  average_enter_price: string;
  average_close_price: string;
  average_enter_price_without_commission?: string;
  average_close_price_without_commission?: string;
  panic_sell_available: boolean;
  add_funds_available: boolean;
  force_start_available: boolean;
  force_process_available: boolean;
  cancel_available: boolean;
  created_at: string;
  updated_at: string;
  type: string;
  closed_at?: string;
}

@ObjectType({ isAbstract: true })
export class MyCurrentPrice implements CurrentPrice {
  bid: string;
  ask: string;
  last: string;
  day_change_percent?: string;
  quote_volume?: string;
}

@ObjectType({ isAbstract: true })
export class MyLeverage implements Leverage {
  enabled: boolean;
  type?: string;
  value?: string;
}

@ObjectType({ isAbstract: true })
export class MyMargin implements Margin {
  amount: string;
  total: string;
}

@ObjectType({ isAbstract: true })
export class MyPosition implements Position {
  type: string;
  editable: boolean;
  units: MyUnits;
  price: MyPositionPrice;
  total: MyTotal;
  order_type: string;
  status: MyPositionStatus;
  conditional?: MyPositionConditional;
}

@ObjectType({ isAbstract: true })
export class MyPositionConditional implements PositionConditional {
  editable: boolean;
  price: MyPurplePrice;
  order_type: string;
  trailing: MyTrailing;
}

@ObjectType({ isAbstract: true })
export class MyPurplePrice implements PurplePrice {
  value: string;
  type: string;
}

@ObjectType({ isAbstract: true })
export class MyTrailing implements Trailing {
  enabled: boolean;
  @Field((type) => String, { nullable: true })
  percent: null;
}

@ObjectType({ isAbstract: true })
export class MyPositionPrice implements PositionPrice {
  value: string;
  value_without_commission?: string;
  editable: boolean;
}

@ObjectType({ isAbstract: true })
export class MyPositionStatus implements PositionStatus {
  type: string;
  title: string;
  error?: string;
}

@ObjectType({ isAbstract: true })
export class MyTotal implements Total {
  value: string;
}

@ObjectType({ isAbstract: true })
export class MyUnits implements Units {
  value: string;
  editable?: boolean;
}

@ObjectType({ isAbstract: true })
export class MyProfit implements Profit {
  @Field({ nullable: true })
  volume: string;
  @Field({ nullable: true })
  usd: string;
  @Field((type) => String || Int, { nullable: true })
  percent: string | number;
  @Field((type) => String || Int, { nullable: true })
  roe?: string;
}

@ObjectType({ isAbstract: true })
export class MyStopLoss implements StopLoss {
  enabled: boolean;
  order_type?: string;
  editable?: boolean;
  price?: MyTotal;
  conditional?: MyStopLossConditional;
  timeout?: MyTimeout;
  status?: MyStopLossStatus;
}

@ObjectType({ isAbstract: true })
export class MyStopLossConditional implements StopLossConditional {
  price: MyStepPrice;
  trailing: MyTrailing;
}

@ObjectType({ isAbstract: true })
export class MyStepPrice implements StepPrice {
  value: string;
  type: string;

  @Field((type) => String)
  percent: null;
}

@ObjectType({ isAbstract: true })
export class MyStopLossStatus implements StopLossStatus {
  type: string;
  title: string;
}

@ObjectType({ isAbstract: true })
export class MyTimeout implements Timeout {
  enabled: boolean;
  value: number;
}

@ObjectType({ isAbstract: true })
export class MyTakeProfit implements TakeProfit {
  enabled: boolean;
  steps: MyStep[];
}

@ObjectType({ isAbstract: true })
export class MyStep implements Step {
  id: number;
  order_type: string;
  editable: boolean;
  units?: MyTotal;
  price: MyStepPrice;
  @Field((type) => String || Int)
  volume: string | number;
  total?: string;
  trailing: MyTrailing;
  status: MyPositionStatus;
  data: MyStepData;
  position: number;
}

@ObjectType({ isAbstract: true })
export class MyStepData implements StepData {
  cancelable: boolean;
  panic_sell_available: boolean;
}
