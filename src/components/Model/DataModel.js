export class DataModel {
    constructor(events) {
        this.events = events;
        this._shopListCards = [];
    }
    set shopListCards(data) {
        this._shopListCards = data;
        this.events.emit('shopListCards:receive');
    }
    get shopListCards() {
        return this._shopListCards;
    }
    setPreview(item) {
        if (item !== null && item !== undefined) {
            this.selectedСard = item;
            this.events.emit('modalCard:open', item);
        }
        else {
            console.error('Ошибка:  null или undefined');
        }
    }
}
