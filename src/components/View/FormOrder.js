export class Order {
	constructor(template, events) {
		this.events = events;
		this.formOrder = template.content.querySelector('.form').cloneNode(true);
		this.buttonAll = Array.from(this.formOrder.querySelectorAll('.button_alt'));
		this.buttonSubmit = this.formOrder.querySelector('.order__button');
		this.formErrors = this.formOrder.querySelector('.form__errors');
		this.buttonAll.forEach((item) => {
			item.addEventListener('click', () => {
				this.paymentSelection = item.name;
				events.emit('order:paymentSelection', item);
			});
		});
		this.formOrder.addEventListener('input', (event) => {
			const target = event.target;
			const field = target.name;
			const value = target.value;
			this.events.emit(`order:changeAddress`, { field, value });
		});
		this.formOrder.addEventListener('submit', (event) => {
			event.preventDefault();
			this.events.emit('contacts:open');
		});
	}
	// устанавливаем обводку вокруг выбранного метода оплаты
	set paymentSelection(paymentMethod) {
		this.buttonAll.forEach((item) => {
			item.classList.toggle('button_alt-active', item.name === paymentMethod);
		});
	}
	set valid(value) {
		this.buttonSubmit.disabled = !value;
	}
	render() {
		return this.formOrder;
	}
}
