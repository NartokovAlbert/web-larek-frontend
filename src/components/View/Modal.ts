<<<<<<< HEAD
import { IEvents } from "../base/events";

export interface IModal {
 open(): void;
 close(): void;
 render(): HTMLElement;
}

export class Modal implements IModal {
 protected modalContainer: HTMLElement;
 protected closeButton: HTMLButtonElement;
 protected _content: HTMLElement;
 protected _pageWrapper: HTMLElement;

 constructor(modalContainer: HTMLElement, protected events: IEvents) {
    this.modalContainer = modalContainer;
    this.closeButton = modalContainer.querySelector('.modal__close');
    this._content = modalContainer.querySelector('.modal__content');
    this._pageWrapper = document.querySelector('.page__wrapper');

    this.setupCloseButtonListener();
    this.setupModalClickListener();
    this.setupContentClickListener();
 }

 private setupCloseButtonListener() {
    this.closeButton.addEventListener('click', this.close);
 }

 private setupModalClickListener() {
    this.modalContainer.addEventListener('click', this.handleModalClick);
 }

 private handleModalClick = (event: Event) => {
    if (event.target === this.modalContainer) {
      this.close();
    }
 }

 private setupContentClickListener() {
    this.modalContainer.querySelector('.modal__container').addEventListener('click', event => event.stopPropagation());
 }

 set content(value: HTMLElement) {
    this._content.replaceChildren(value);
 }

 open() {
    this.modalContainer.classList.add('modal_active');
    this.events.emit('modal:open');
    this.locked = true;
 }

 close() {
    this.modalContainer.classList.remove('modal_active');
    this.content = null; // очистка контента в модальном окне
    this.events.emit('modal:close');
    this.locked = false;
 }

 set locked(value: boolean) {
    if (value) {
      this._pageWrapper.classList.add('page__wrapper_locked');
    } else {
      this._pageWrapper.classList.remove('page__wrapper_locked');
    }
 }

 render(): HTMLElement {
    this.open();
    return this.modalContainer;
 }
}
=======
export interface IModal {
    content: HTMLElement;
    open(): void;
    close(): void;
  }
  
  export class Modal implements IModal {
    protected closeButton: HTMLButtonElement;
    protected _content: HTMLElement;
  
    constructor(protected modalContainer: HTMLElement) {
      this.closeButton = modalContainer.querySelector('.modal__close');
      this._content = modalContainer.querySelector('.modal__content');
  
      this.closeButton.addEventListener('click', this.close.bind(this));
      this.modalContainer.addEventListener('click', this.close.bind(this));
      this.modalContainer.querySelector('.modal__container')
        .addEventListener('click', (event) => event.stopPropagation());
    }
  
    // принимает элемент разметки которая будет отображаться в "modal__content" модального окна
    set content(value: HTMLElement) {
      this._content.replaceChildren(value); // ???
    }
  
    // открытие модального окна
    open() {
      this.modalContainer.classList.add('modal_active');
    }
  
    // закрытие модального окна
    close() {
      this.modalContainer.classList.remove('modal_active');
      this.content = null; // очистка контента в модальном окне
    }
  }
>>>>>>> aa47d7e7c405df101da3df5302317082db2f4452
