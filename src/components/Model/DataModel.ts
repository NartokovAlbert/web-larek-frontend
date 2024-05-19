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
