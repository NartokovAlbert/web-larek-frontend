export class Success {
    constructor(template, events) {
        this.template = template;
        this.events = events;
        this.handleButtonClick = () => {
            this.events.emit('success:close');
        };
        this.success = this.cloneSuccessElement(this.template);
        this.description = this.success.querySelector('.order-success__description');
        this.button = this.success.querySelector('.order-success__close');
        this.setupButtonListener();
    }
    cloneSuccessElement(template) {
        return template.content.querySelector('.order-success').cloneNode(true);
    }
    setupButtonListener() {
        this.button.addEventListener('click', this.handleButtonClick);
    }
    render(total) {
        this.description.textContent = String(`Списано ${total} синапсов`);
        return this.success;
    }
}
