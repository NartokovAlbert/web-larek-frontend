import { IEvents } from '../base/events';

export interface IOrder {
    formOrder: HTMLFormElement;
    buttonAll: HTMLButtonElement[];
    paymentChoice: string; // Изменено с String на string
    formErrors: HTMLElement;
    render(): HTMLElement;
}

export class Order implements IOrder {
    formOrder: HTMLFormElement;
    buttonAll: HTMLButtonElement[];
    buttonSubmit: HTMLButtonElement;
    formErrors: HTMLElement;
    private _paymentChoice: string; // Внутреннее хранилище для PaymentChoice
    protected events: IEvents;

    constructor(template: HTMLTemplateElement, events: IEvents) {
        this.events = events;
        this.formOrder = template.content.querySelector('.form')?.cloneNode(true) as HTMLFormElement;
        if (!this.formOrder) {
            throw new Error('Form element not found in the template.');
        }

        this.buttonAll = Array.from(this.formOrder.querySelectorAll('.button_alt')) as HTMLButtonElement[];
        this.buttonSubmit = this.formOrder.querySelector('.order__button') as HTMLButtonElement;
        if (!this.buttonSubmit) {
            throw new Error('Submit button not found in the form.');
        }
        this.formErrors = this.formOrder.querySelector('.form__errors') as HTMLElement;
        if (!this.formErrors) {
            throw new Error('Error container not found in the form.');
        }

        // Initialize payment choice
        this._paymentChoice = '';

        this.buttonAll.forEach((item) => {
            item.addEventListener('click', () => {
                this.paymentChoice = item.name;
                this.events.emit('order:paymentChoice', item);
            });
        });

        this.formOrder.addEventListener('input', (event: Event) => {
            const target = event.target as HTMLInputElement;
            const field = target.name;
            const value = target.value;
            this.events.emit('order:changeAddress', { field, value });
        });

        this.formOrder.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            this.events.emit('contacts:open');
        });
    }

    // устанавливаем обводку вокруг выбранного метода оплаты
    set paymentChoice(paymentMethod: string) {
        this._paymentChoice = paymentMethod;
        this.buttonAll.forEach((item) => {
            item.classList.toggle('button_alt-active', item.name === paymentMethod);
        });
    }

    get paymentChoice(): string {
        return this._paymentChoice;
    }

    set valid(value: boolean) {
        this.buttonSubmit.disabled = !value;
    }

    render(): HTMLElement {
        return this.formOrder;
    }
}