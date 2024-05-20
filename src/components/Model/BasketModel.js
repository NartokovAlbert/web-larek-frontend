export class BasketModel {
	constructor() {
		this.basketProducts = [];
	}
	getCounter() {
		return this.basketProducts.length;
	}
	getSumAllProducts() {
		return this.basketProducts.reduce((sum, item) => sum + item.price, 0);
	}
	setSelectedСard(data) {
		this.basketProducts.push(data);
	}
	deleteCardToBasket(item) {
		this.basketProducts = this.basketProducts.filter(
			(product) => product !== item
		);
	}
	clearBasketProducts() {
		this.basketProducts = [];
	}
}
