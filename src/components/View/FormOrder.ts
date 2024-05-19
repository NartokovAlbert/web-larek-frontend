import { IEvents } from "../base/events";

export interface IOrder {
 formOrder: HTMLFormElement;
 buttonAll: HTMLButtonElement[];
 paymentSelection: string;
 formErrors: HTMLElement;
 render(): HTMLElement;
}

export class Order implements IOrder {
 formOrder: HTMLFormElement;
 buttonAll: HTMLButtonElement[];
 buttonSubmit: HTMLButtonElement;
 formErrors: HTMLElement;

 constructor(private template: HTMLTemplateElement, private events: IEvents) {
    this.formOrder = this.cloneForm(this.template);
    this.buttonAll = Array.from(this.formOrder.querySelectorAll('.button_alt'));
    this.buttonSubmit = this.formOrder.querySelector('.order__button');
    this.formErrors = this.formOrder.querySelector('.form__errors');

    this.setupButtonListeners();
    this.setupInputListener();
    this.setupSubmitListener();
 }

 private cloneForm(template: HTMLTemplateElement): HTMLFormElement {
    return template.content.querySelector('.form').cloneNode(true) as HTMLFormElement;
 }

 private setupButtonListeners() {
    this.buttonAll.forEach(button => {
      button.addEventListener('click', this.handlePaymentSelection);
    });
 }

 private handlePaymentSelection = (event: Event) => {
    const button = event.target as HTMLButtonElement;
    this.paymentSelection = button.name;
    this.events.emit('order:paymentSelection', button);
 }

 private setupInputListener() {
    this.formOrder.addEventListener('input', this.handleInputChange);
 }

 private handleInputChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const { name: field, value } = target;
    this.events.emit(`order:changeAddress`, { field, value });
 }

 private setupSubmitListener() {
    this.formOrder.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      this.events.emit('contacts:open');
    });
 }

 set paymentSelection(paymentMethod: string) {
    this.buttonAll.forEach(button => {
      button.classList.toggle('button_alt-active', button.name === paymentMethod);
    });
 }

 set valid(value: boolean) {
    this.buttonSubmit.disabled = !value;
 }

 render() {
    return this.formOrder;
 }
}