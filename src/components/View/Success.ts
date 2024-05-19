import { IEvents } from "../base/events";

export interface ISuccess {
 success: HTMLElement;
 description: HTMLElement;
 button: HTMLButtonElement;
 render(total: number): HTMLElement;
}

export class Success implements ISuccess {
 success: HTMLElement;
 description: HTMLElement;
 button: HTMLButtonElement;

 constructor(private template: HTMLTemplateElement, private events: IEvents) {
    this.success = this.cloneSuccessElement(this.template);
    this.description = this.success.querySelector('.order-success__description');
    this.button = this.success.querySelector('.order-success__close');

    this.setupButtonListener();
 }

 private cloneSuccessElement(template: HTMLTemplateElement): HTMLElement {
    return template.content.querySelector('.order-success').cloneNode(true) as HTMLElement;
 }

 private setupButtonListener() {
    this.button.addEventListener('click', this.handleButtonClick);
 }

 private handleButtonClick = () => {
    this.events.emit('success:close');
 }

 render(total: number) {
    this.description.textContent = String(`Списано ${total} синапсов`);
    return this.success;
 }
}
