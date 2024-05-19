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