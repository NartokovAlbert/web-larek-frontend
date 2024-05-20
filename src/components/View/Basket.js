import { createElement } from '../../utils/utils';
export class Basket {
	constructor(template, events) {
		this.events = events;
		const content = template.content;
		this.basket = content.querySelector('.basket').cloneNode(true);
		this.title = this.basket.querySelector('.modal__title');
		this.basketList = this.basket.querySelector('.basket__list');
		this.button = this.basket.querySelector('.basket__button');
		this.basketPrice = this.basket.querySelector('.basket__price');
		this.headerBasketButton = document.querySelector('.header__basket');
		this.headerBasketCounter = document.querySelector(
			'.header__basket-counter'
		);
		this.button.addEventListener('click', () => {
			this.events.emit('order:open');
		});
		this.headerBasketButton.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}
	set items(items) {
		this.basketList.replaceChildren(...items);
		this.button.disabled = !items.length;
		if (!items.length) {
			this.basketList.replaceChildren(
				createElement('p', { textContent: 'Корзина пуста' })
			);
		}
	}
	renderHeaderBasketCounter(value) {
		this.headerBasketCounter.textContent = String(value);
	}
	renderSumAllProducts(sumAll) {
		this.basketPrice.textContent = String(sumAll + ' синапсов');
	}
	render() {
		this.title.textContent = 'Корзина';
		return this.basket;
	}
}
