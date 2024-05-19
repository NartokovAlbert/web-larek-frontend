export class BasketItem {
    constructor(template, events, actions) {
        this.events = events;
        const content = template.content;
        this.basketItem = content.querySelector('.basket__item').cloneNode(true);
        this.index = this.basketItem.querySelector('.basket__item-index');
        this.title = this.basketItem.querySelector('.card__title');
        this.price = this.basketItem.querySelector('.card__price');
        this.buttonDelete = this.basketItem.querySelector('.basket__item-delete');
        if (actions === null || actions === void 0 ? void 0 : actions.onClick) {
            this.buttonDelete.addEventListener('click', actions.onClick);
        }
    }
    setPrice(value) {
        if (value === null) {
            return 'Бесценно';
        }
        return String(value) + ' синапсов';
    }
    render(data, item) {
        this.index.textContent = String(item);
        this.title.textContent = data.title;
        this.price.textContent = this.setPrice(data.price);
        return this.basketItem;
    }
}
