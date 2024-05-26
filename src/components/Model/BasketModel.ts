import { IProductItem } from '../../types';

export interface IBasketModel {
    basketProducts: IProductItem[];
    getCounter: () => number;
    getSumAllProducts: () => number;
    setSelectedCard(data: IProductItem): void;
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

    setSelectedCard(data: IProductItem) {
        // Проверяем, если товар уже существует в корзине
        const exists = this.basketProducts.some(item => item.id === data.id);
        if (!exists) {
            this.basketProducts.push(data);
        }
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