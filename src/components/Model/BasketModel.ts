import { IProductItem } from "../../types";

export interface IBasketModel {
    basketProducts: IProductItem[];
    getCounter: () => number;
    getSumAllProducts: () => number;
    setSelectedCard(data: IProductItem): void;
    deleteCardToBasket(item: IProductItem): void;
    clearBasketProducts(): void;
    isProductInBasket(id: string): boolean;
}

export class BasketModel implements IBasketModel {
    basketProducts: IProductItem[] = []; 

    getCounter() {
        return this.basketProducts.length;
    }

    getSumAllProducts() {
        return this.basketProducts.reduce((sum, item) => sum + item.price, 0);
    }

    setSelectedCard(data: IProductItem) {
        const exists = this.basketProducts.some(item => item.id === data.id);
        if (!exists) {
            this.basketProducts.push(data);
        }
    }

    deleteCardToBasket(item: IProductItem) {
        this.basketProducts = this.basketProducts.filter(
            (product) => product.id !== item.id
        );
    }

    clearBasketProducts() {
        this.basketProducts = [];
    }

    isProductInBasket(id: string) {
        return this.basketProducts.some(item => item.id === id);
    }
}