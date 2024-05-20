export class Contacts {
	constructor(template, events) {
		this.events = events;
		this.formContacts = template.content.querySelector('.form').cloneNode(true);
		this.inputAll = Array.from(
			this.formContacts.querySelectorAll('.form__input')
		);
		this.buttonSubmit = this.formContacts.querySelector('.button');
		this.formErrors = this.formContacts.querySelector('.form__errors');
		this.inputAll.forEach((item) => {
			item.addEventListener('input', (event) => {
				const target = event.target;
				const field = target.name;
				const value = target.value;
				this.events.emit(`contacts:changeInput`, { field, value });
			});
		});
		this.formContacts.addEventListener('submit', (event) => {
			event.preventDefault();
			this.events.emit('success:open');
		});
	}
	set valid(value) {
		this.buttonSubmit.disabled = !value;
	}
	render() {
		return this.formContacts;
	}
}
