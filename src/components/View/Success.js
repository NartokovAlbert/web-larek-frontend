export class Success {
	constructor(template, events) {
			this.events = events;
			this.success = template.content.querySelector('.order-success').cloneNode(true);
			this._description = this.success.querySelector('.order-success__description');
			this._button = this.success.querySelector('.order-success__close');
			this._button.addEventListener('click', () => {
					this.events.emit('success:close');
			});
	}

	render(total) {
			this._description.textContent = `Списано ${total} синапсов`;
			return this.success;
	}
}
