<<<<<<< HEAD
import { IActions, IOrderItem } from "../../types";
import { IEvents } from "../base/events";

export interface ICard {
  render(data: IOrderItem): HTMLElement;
}

export class Card implements ICard {
  protected _cardElement: HTMLElement;
  protected _cardCategory: HTMLElement;
  protected _cardTitle: HTMLElement;
  protected _cardImage: HTMLImageElement;
  protected _cardPrice: HTMLElement;
  protected _colors = <Record<string, string>>{
    "дополнительное": "additional",
    "софт-скил": "soft",
    "кнопка": "button",
    "хард-скил": "hard",
    "другое": "other",
  }
  
  constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IActions) {
    this._cardElement = template.content.querySelector('.card').cloneNode(true) as HTMLElement;
    this._cardCategory = this._cardElement.querySelector('.card__category');
    this._cardTitle = this._cardElement.querySelector('.card__title');
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardPrice = this._cardElement.querySelector('.card__price');
    
    if (actions?.onClick) {
      this._cardElement.addEventListener('click', actions.onClick);
    }
 }

 protected setText(element: HTMLElement, value: unknown): void {
    if (element) {
      element.textContent = String(value);
    }
 }

 set cardCategory(value: string) {
    this.setText(this._cardCategory, value);
    this._cardCategory.className = `card__category card__category_${this._colors[value]}`;
 }

 protected setPrice(value: number | null): string {
    if (value === null) {
      return 'Бесценно';
    }
    return String(value) + ' синапсов';
 }

 render(data: IOrderItem): HTMLElement {
    this.cardCategory = data.category;
    this._cardTitle.textContent = data.title;
    this._cardImage.src = data.image;
    this._cardImage.alt = this._cardTitle.textContent;
    this._cardPrice.textContent = this.setPrice(data.price);
    return this._cardElement;
 }
=======
import { IProductItem } from "../../types";
import { IEvents } from "../base/events";


export interface ICard {
  render(data: IProductItem): HTMLElement;
}

export interface IActions {
  onClick: (event: MouseEvent) => void;
}

export class Card implements ICard {
  cardElement: HTMLElement;
  cardCategory: HTMLElement;
  cardTitle: HTMLElement;
  cardImage: HTMLImageElement;
  cardPrice: HTMLElement;

  constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IActions) {
    this.cardElement = template.content.querySelector('.card').cloneNode(true) as HTMLElement;
    this.cardCategory = this.cardElement.querySelector('.card__category');
    this.cardTitle = this.cardElement.querySelector('.card__title');
    this.cardImage = this.cardElement.querySelector('.card__image');
    this.cardPrice = this.cardElement.querySelector('.card__price');

    if (actions?.onClick) this.cardElement.addEventListener('click', actions.onClick);
  }

  render(data: IProductItem): HTMLElement {
    this.cardCategory.textContent = data.category;
    this.cardTitle.textContent = data.title;
    this.cardImage.src = data.image;
    const dataPrice = data.price;
    function getDataPrice(dataPrice: number | null): string {
      if (dataPrice === null) {
        return 'Бесценно'
      }
      return String(dataPrice) + ' синапсов'
    }
    this.cardPrice.textContent = getDataPrice(dataPrice);
    return this.cardElement;
  }
>>>>>>> aa47d7e7c405df101da3df5302317082db2f4452
}