import { IActions, IProductItem } from '../../types';
import { IEvents } from '../base/events';
import { Card, ICard } from './Card';

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

    private updateButtonState(data: IProductItem, isInBasket: boolean): void {
        if (isInBasket) {
            this._button.setAttribute('disabled', 'true');
            this._button.textContent = 'Уже в корзине';
        } else if (this.isProductAvailable(data)) {
            this._button.removeAttribute('disabled');
            this._button.textContent = 'Купить';
        } else {
            this._button.setAttribute('disabled', 'true');
            this._button.textContent = 'Не продается';
        }
    }

/* проверка для нужных объектов в data */
renderCardPreview(data: IProductItem, isInBasket: boolean): HTMLElement {
    if (!data) {
        console.error('Invalid data provided for card preview rendering');
        return document.createElement('div');
    }
    this._cardCategory.textContent = data.category || 'No Category';
    this._cardTitle.textContent = data.title || 'No Title';
    this._cardImage.src = data.image || '';
    this._cardImage.alt = this._cardTitle.textContent;
    this._cardPrice.textContent = this.setPrice(data.price);
    this._text.textContent = data.description || '';
    this.updateButtonState(data, isInBasket);
    return this._cardElement;
}
}

/*     renderCardPreview(data: IProductItem, isInBasket: boolean): HTMLElement {
        this._cardCategory.textContent = data.category;
        this._cardTitle.textContent = data.title;
        this._cardImage.src = data.image;
        this._cardImage.alt = this._cardTitle.textContent;
        this._cardPrice.textContent = this.setPrice(data.price);
        this._text.textContent = data.description;
        this.updateButtonState(data, isInBasket);
        return this._cardElement;
    }
} */