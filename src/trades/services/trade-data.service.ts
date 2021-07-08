import { Injectable } from '@nestjs/common';
import { MyOrder } from 'src/gql/models/positions.model';
import { Order } from 'src/trades/helper/commas-repo/types/generated-types';
import { CommasUserDataDTO } from 'src/trades/interfaces/ICommasAccounts.interface';
import { TradeCommasService } from 'src/trades/services';

@Injectable()
export class TradeDataService {
  /**
   *
   */
  public _users: CommasUserDataDTO[] = [];

  public _orders: MyOrder[] = [];

  constructor(public commasService: TradeCommasService) {
    // super();
  }
}
