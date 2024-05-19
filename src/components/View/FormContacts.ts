import { IEvents } from "../base/events";

export interface IContacts {
 formContacts: HTMLFormElement;
 inputAll: HTMLInputElement[];
 buttonSubmit: HTMLButtonElement;
 formErrors: HTMLElement;
 render(): HTMLElement;
}

export class Contacts implements IContacts {
 formContacts: HTMLFormElement;
 inputAll: HTMLInputElement[];
 buttonSubmit: HTMLButtonElement;
 formErrors: HTMLElement;

 constructor(private template: HTMLTemplateElement, private events: IEvents) {
    this.formContacts = this.cloneForm(this.template);
    this.inputAll = Array.from(this.formContacts.querySelectorAll('.form__input'));
    this.buttonSubmit = this.formContacts.querySelector('.button');
    this.formErrors = this.formContacts.querySelector('.form__errors');

    this.setupInputListeners();
    this.setupSubmitListener();
 }

 private cloneForm(template: HTMLTemplateElement): HTMLFormElement {
    return template.content.querySelector('.form').cloneNode(true) as HTMLFormElement;
 }

 private setupInputListeners() {
    this.inputAll.forEach(input => {
      input.addEventListener('input', this.handleInputChange);
    });
 }

 private handleInputChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const { name: field, value } = target;
    this.events.emit(`contacts:changeInput`, { field, value });
 }

 private setupSubmitListener() {
    this.formContacts.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      this.events.emit('success:open');
    });
 }

 get valid() {
    return !this.buttonSubmit.disabled;
 }

 set valid(value: boolean) {
    this.buttonSubmit.disabled = !value;
 }

 render() {
    return this.formContacts;
 }
}