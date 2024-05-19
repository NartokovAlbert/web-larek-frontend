import { createElement } from "../../utils/utils";
import { IEvents } from "../base/events";

export interface IBasket {
  basket: HTMLElement;
  title: HTMLElement;
  basketList: HTMLElement;
  button: HTMLButtonElement;
  basketPrice: HTMLElement;
  headerBasketButton: HTMLButtonElement;
  headerBasketCounter: HTMLElement;
  renderHeaderBasketCounter(value: number): void;
  renderSumAllProducts(sumAll: number): void;
  render(): HTMLElement;
}

export class Basket implements IBasket {
  basket: HTMLElement;
  title: HTMLElement;
  basketList: HTMLElement;
  button: HTMLButtonElement;
  basketPrice: HTMLElement;
  headerBasketButton: HTMLButtonElement;
  headerBasketCounter: HTMLElement;
  
  constructor(template: HTMLTemplateElement, protected events: IEvents) {
    const content = template.content;
    this.basket = content.querySelector('.basket').cloneNode(true) as HTMLElement;
    this.title = this.basket.querySelector('.modal__title');
    this.basketList = this.basket.querySelector('.basket__list');
    this.button = this.basket.querySelector('.basket__button');
    this.basketPrice = this.basket.querySelector('.basket__price');
    this.headerBasketButton = document.querySelector('.header__basket');
    this.headerBasketCounter = document.querySelector('.header__basket-counter');

    this.button.addEventListener('click', () => { this.events.emit('order:open') });
    this.headerBasketButton.addEventListener('click', () => { this.events.emit('basket:open') });
 }

 set items(items: HTMLElement[]) {
    this.basketList.replaceChildren(...items);
    this.button.disabled = !items.length;
    if (!items.length) {
      this.basketList.replaceChildren(createElement<HTMLParagraphElement>('p', { textContent: 'Корзина пуста' }));
    }
 }

 renderHeaderBasketCounter(value: number) {
    this.headerBasketCounter.textContent = String(value);
 }

 renderSumAllProducts(sumAll: number) {
    this.basketPrice.textContent = String(sumAll + ' синапсов');
 }

 render() {
    this.title.textContent = 'Корзина';
    return this.basket;
 }
}