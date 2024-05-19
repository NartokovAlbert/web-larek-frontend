import { Card } from "./Card";
export class CardPreview extends Card {
    constructor(template, events, actions) {
        super(template, events, actions);
        this.events = events;
        this.text = this._cardElement.querySelector('.card__text');
        this.button = this._cardElement.querySelector('.card__button');
        this.button.addEventListener('click', () => { this.events.emit('card:addBasket'); });
    }
    notSale(data) {
        if (data.price) {
            return 'Купить';
        }
        else {
            this.button.setAttribute('disabled', 'true');
            return 'Не продается';
        }
    }
    render(data) {
        this._cardCategory.textContent = data.category;
        this.cardCategory = data.category;
        this._cardTitle.textContent = data.title;
        this._cardImage.src = data.image;
        this._cardImage.alt = this._cardTitle.textContent;
        this._cardPrice.textContent = this.setPrice(data.price);
        this.text.textContent = data.description;
        this.button.textContent = this.notSale(data);
        return this._cardElement;
    }
}
