import { IOrderItem } from "../../types";
import { IEvents } from "../base/events";

export interface IDataModel {
  shopListCards: IOrderItem[];
  selectedСard: IOrderItem;
  setPreview(item: IOrderItem): void;
}

export class DataModel implements IDataModel {
  protected _shopListCards: IOrderItem[];
  selectedСard: IOrderItem;

  constructor(protected events: IEvents) {
    this._shopListCards = []
  }

  set shopListCards(data: IOrderItem[]) {
    this._shopListCards = data;
    this.events.emit('shopListCards:receive');
  }

  get shopListCards() {
    return this._shopListCards;
  }

  setPreview(item: IOrderItem) {
    if (item !== null && item !== undefined) {
      this.selectedСard = item;
      this.events.emit('modalCard:open', item);
    } else {
      console.error('Ошибка:  null или undefined');
    }
  }
}