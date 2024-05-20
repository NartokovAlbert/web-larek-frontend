import { Card, ICard } from './Card';
import { IActions, IProductItem } from '../../types';
import { IEvents } from '../base/events';

export class CardPreview extends Card implements ICard {
	private _text: HTMLElement;
	private _button: HTMLElement;

	constructor(
		template: HTMLTemplateElement,
		protected events: IEvents,
		actions?: IActions
	) {
		super(template, events, actions);
		this._text = this._cardElement.querySelector('.card__text');
		this._button = this._cardElement.querySelector('.card__button');
		this._button.addEventListener('click', () => {
			this.events.emit('card:addBasket');
		});
	}

	private isProductAvailable(data: IProductItem): boolean {
		return !!data.price;
	}

	private updateButtonState(data: IProductItem): void {
		if (this.isProductAvailable(data)) {
			this._button.removeAttribute('disabled');
			this._button.textContent = 'Купить';
		} else {
			this._button.setAttribute('disabled', 'true');
			this._button.textContent = 'Не продается';
		}
	}

	render(data: IProductItem): HTMLElement {
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
