export class DataModel {
	constructor(events) {
		this.events = events;
		this._productCards = [];
	}
	set productCards(data) {
		this._productCards = data;
		this.events.emit('productCards:receive');
	}
	get productCards() {
		return this._productCards;
	}
	setPreview(item) {
		this.selectedCard = item;
		this.events.emit('popupCard:open', this.selectedCard);
	}
}
