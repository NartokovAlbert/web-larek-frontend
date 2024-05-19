import { IOrderItem } from "../../types";

export interface IBasketModel {
  basketProducts: IOrderItem[];
  getCounter: () => number;
  getSumAllProducts: () => number;
  setSelectedСard<T extends IOrderItem>(data: T): void;
  deleteCardToBasket<T extends IOrderItem>(item: T): boolean;
  clearBasketProducts(): void
}

export class BasketModel implements IBasketModel {
  protected _basketProducts: IOrderItem[]; // список карточек товара в корзине

  constructor() {
    this._basketProducts = [];
  }
  clearBasketProducts(): void {
    throw new Error("Method not implemented.");
  }

  set basketProducts(data: IOrderItem[]) {
    this._basketProducts = data;
  }

  get basketProducts() {
    return this._basketProducts;
  }

  // количество товара в корзине
  getCounter() {
    return this.basketProducts.length;
  }

  // сумма всех товаров в корзине
  getSumAllProducts() {
    let sumAll = 0;
    this.basketProducts.forEach(item => {
      sumAll = sumAll + item.price;
    });
    return sumAll;
  }

  setSelectedСard(data: IOrderItem | any) {
    this._basketProducts.push(data);
  }

  deleteCardToBasket(item: IOrderItem | any): boolean {
    const index = this._basketProducts.indexOf(item);
    if (index >= 0) {
      this._basketProducts.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }
}