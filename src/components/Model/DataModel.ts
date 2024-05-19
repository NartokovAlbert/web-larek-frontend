<<<<<<< HEAD
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
=======
import { IProductItem } from "../../types";
import { EventEmitter, IEvents } from "../base/events";

export interface IDataModel {
  productCards: IProductItem[];
  preview: string | null;
}

export class DataModel implements IDataModel {
  protected _productCards: IProductItem[];
  preview: string | null;

  constructor(protected events: IEvents) {
    this._productCards = []
  }

  /* сохранить массив карточек в переменную */
  set productCards(data: IProductItem[]) {
    this._productCards = data;
    this.events.emit('productCards:receive');
  }

  get productCards() {
    return this._productCards; 
  }

  
  setPreview(item: IProductItem) {
    this.preview = item.id;
    this.events.emit('openModalCard', item)
  }
}
>>>>>>> aa47d7e7c405df101da3df5302317082db2f4452
