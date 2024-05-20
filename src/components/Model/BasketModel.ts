import { IProductItem } from '../../types';

export interface IBasketModel {
	basketProducts: IProductItem[];
	getCounter: () => number;
	getSumAllProducts: () => number;
	setSelectedСard(data: IProductItem): void;
	deleteCardToBasket(item: IProductItem): void;
	clearBasketProducts(): void;
}
export class BasketModel implements IBasketModel {
	basketProducts: IProductItem[]; // список карточек товара в корзине
	constructor() {
		this.basketProducts = [];
	}
	getCounter() {
		return this.basketProducts.length;
	}
	getSumAllProducts() {
		return this.basketProducts.reduce((sum, item) => sum + item.price, 0);
	}
	setSelectedСard(data: IProductItem) {
		this.basketProducts.push(data);
	}
	deleteCardToBasket(item: IProductItem) {
		this.basketProducts = this.basketProducts.filter(
			(product) => product !== item
		);
	}
	clearBasketProducts() {
		this.basketProducts = [];
	}
}
