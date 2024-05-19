export class Card {
    constructor(template, events, actions) {
        this.events = events;
        this._colors = {
            "дополнительное": "additional",
            "софт-скил": "soft",
            "кнопка": "button",
            "хард-скил": "hard",
            "другое": "other",
        };
        this._cardElement = template.content.querySelector('.card').cloneNode(true);
        this._cardCategory = this._cardElement.querySelector('.card__category');
        this._cardTitle = this._cardElement.querySelector('.card__title');
        this._cardImage = this._cardElement.querySelector('.card__image');
        this._cardPrice = this._cardElement.querySelector('.card__price');
        if (actions === null || actions === void 0 ? void 0 : actions.onClick) {
            this._cardElement.addEventListener('click', actions.onClick);
        }
    }
    setText(element, value) {
        if (element) {
            element.textContent = String(value);
        }
    }
    set cardCategory(value) {
        this.setText(this._cardCategory, value);
        this._cardCategory.className = `card__category card__category_${this._colors[value]}`;
    }
    setPrice(value) {
        if (value === null) {
            return 'Бесценно';
        }
        return String(value) + ' синапсов';
    }
    render(data) {
        this.cardCategory = data.category;
        this._cardTitle.textContent = data.title;
        this._cardImage.src = data.image;
        this._cardImage.alt = this._cardTitle.textContent;
        this._cardPrice.textContent = this.setPrice(data.price);
        return this._cardElement;
    }
}
