export class Contacts {
    constructor(template, events) {
        this.template = template;
        this.events = events;
        this.handleInputChange = (event) => {
            const target = event.target;
            const { name: field, value } = target;
            this.events.emit(`contacts:changeInput`, { field, value });
        };
        this.formContacts = this.cloneForm(this.template);
        this.inputAll = Array.from(this.formContacts.querySelectorAll('.form__input'));
        this.buttonSubmit = this.formContacts.querySelector('.button');
        this.formErrors = this.formContacts.querySelector('.form__errors');
        this.setupInputListeners();
        this.setupSubmitListener();
    }
    cloneForm(template) {
        return template.content.querySelector('.form').cloneNode(true);
    }
    setupInputListeners() {
        this.inputAll.forEach(input => {
            input.addEventListener('input', this.handleInputChange);
        });
    }
    setupSubmitListener() {
        this.formContacts.addEventListener('submit', (event) => {
            event.preventDefault();
            this.events.emit('success:open');
        });
    }
    get valid() {
        return !this.buttonSubmit.disabled;
    }
    set valid(value) {
        this.buttonSubmit.disabled = !value;
    }
    render() {
        return this.formContacts;
    }
}
