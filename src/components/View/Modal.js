export class Modal {
    constructor(modalContainer, events) {
        this.events = events;
        this.handleModalClick = (event) => {
            if (event.target === this.modalContainer) {
                this.close();
            }
        };
        this.modalContainer = modalContainer;
        this.closeButton = modalContainer.querySelector('.modal__close');
        this._content = modalContainer.querySelector('.modal__content');
        this._pageWrapper = document.querySelector('.page__wrapper');
        this.setupCloseButtonListener();
        this.setupModalClickListener();
        this.setupContentClickListener();
    }
    setupCloseButtonListener() {
        this.closeButton.addEventListener('click', this.close);
    }
    setupModalClickListener() {
        this.modalContainer.addEventListener('click', this.handleModalClick);
    }
    setupContentClickListener() {
        this.modalContainer.querySelector('.modal__container').addEventListener('click', event => event.stopPropagation());
    }
    set content(value) {
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
    set locked(value) {
        if (value) {
            this._pageWrapper.classList.add('page__wrapper_locked');
        }
        else {
            this._pageWrapper.classList.remove('page__wrapper_locked');
        }
    }
    render() {
        this.open();
        return this.modalContainer;
    }
}
