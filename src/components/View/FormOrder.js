export class Order {
    constructor(template, events) {
        this.template = template;
        this.events = events;
        this.handlePaymentSelection = (event) => {
            const button = event.target;
            this.paymentSelection = button.name;
            this.events.emit('order:paymentSelection', button);
        };
        this.handleInputChange = (event) => {
            const target = event.target;
            const { name: field, value } = target;
            this.events.emit(`order:changeAddress`, { field, value });
        };
        this.formOrder = this.cloneForm(this.template);
        this.buttonAll = Array.from(this.formOrder.querySelectorAll('.button_alt'));
        this.buttonSubmit = this.formOrder.querySelector('.order__button');
        this.formErrors = this.formOrder.querySelector('.form__errors');
        this.setupButtonListeners();
        this.setupInputListener();
        this.setupSubmitListener();
    }
    cloneForm(template) {
        return template.content.querySelector('.form').cloneNode(true);
    }
    setupButtonListeners() {
        this.buttonAll.forEach(button => {
            button.addEventListener('click', this.handlePaymentSelection);
        });
    }
    setupInputListener() {
        this.formOrder.addEventListener('input', this.handleInputChange);
    }
    setupSubmitListener() {
        this.formOrder.addEventListener('submit', (event) => {
            event.preventDefault();
            this.events.emit('contacts:open');
        });
    }
    set paymentSelection(paymentMethod) {
        this.buttonAll.forEach(button => {
            button.classList.toggle('button_alt-active', button.name === paymentMethod);
        });
    }
    set valid(value) {
        this.buttonSubmit.disabled = !value;
    }
    render() {
        return this.formOrder;
    }
}
