export class BasketModel {
    constructor() {
        this._basketProducts = [];
    }
    clearBasketProducts() {
        throw new Error("Method not implemented.");
    }
    set basketProducts(data) {
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
    setSelectedСard(data) {
        this._basketProducts.push(data);
    }
    deleteCardToBasket(item) {
        const index = this._basketProducts.indexOf(item);
        if (index >= 0) {
            this._basketProducts.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    }
}
