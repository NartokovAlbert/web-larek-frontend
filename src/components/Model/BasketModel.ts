import { IProductItem } from "../../types";

export interface IBasketModel {
    basketProducts: IProductItem[];
    getCounter: () => number;
    getSumAllProducts: () => number;
    setSelectedCard(data: IProductItem): void;
    deleteCardToBasket(item: IProductItem): void;
    clearBasketProducts(): void;
    isProductInBasket(id: string): boolean; // Добавляем метод isProductInBasket
}

export class BasketModel implements IBasketModel {
    basketProducts: IProductItem[];

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
        this.basketProducts.push(data);
    }

    deleteCardToBasket(item: IProductItem) {
        this.basketProducts = this.basketProducts.filter(product => product !== item);
    }

    clearBasketProducts() {
        this.basketProducts = [];
    }

    isProductInBasket(id: string): boolean {
        return this.basketProducts.some(product => product.id === id);
    }
}