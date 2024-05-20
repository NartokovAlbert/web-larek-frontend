import { Card } from './Card';
export class CardPreview extends Card {
	constructor(template, events, actions) {
		super(template, events, actions);
		this.events = events;
		this._text = this._cardElement.querySelector('.card__text');
		this._button = this._cardElement.querySelector('.card__button');
		this._button.addEventListener('click', () => {
			this.events.emit('card:addBasket');
		});
	}
	isProductAvailable(data) {
		return !!data.price;
	}
	updateButtonState(data) {
		if (this.isProductAvailable(data)) {
			this._button.removeAttribute('disabled');
			this._button.textContent = 'Купить';
		} else {
			this._button.setAttribute('disabled', 'true');
			this._button.textContent = 'Не продается';
		}
	}
	render(data) {
		this._cardCategory.textContent = data.category;
		this._cardTitle.textContent = data.title;
		this._cardImage.src = data.image;
		this._cardImage.alt = this._cardTitle.textContent;
		this._cardPrice.textContent = this.setPrice(data.price);
		this._text.textContent = data.description;
		this.updateButtonState(data);
		return this._cardElement;
	}
}
