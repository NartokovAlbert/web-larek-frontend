export class EventEmitter {
	constructor() {
		this._events = new Map();
	}
	on(eventName, callback) {
		var _a;
		if (!this._events.has(eventName)) {
			this._events.set(eventName, new Set());
		}
		(_a = this._events.get(eventName)) === null || _a === void 0
			? void 0
			: _a.add(callback);
	}
	off(eventName, callback) {
		var _a;
		if (this._events.has(eventName)) {
			this._events.get(eventName).delete(callback);
			if (
				((_a = this._events.get(eventName)) === null || _a === void 0
					? void 0
					: _a.size) === 0
			) {
				this._events.delete(eventName);
			}
		}
	}
	emit(eventName, data) {
		this._events.forEach((subscribers, name) => {
			if (
				(name instanceof RegExp && name.test(eventName)) ||
				name === eventName
			) {
				subscribers.forEach((callback) => callback(data));
			}
		});
	}
	onAll(callback) {
		this.on('*', callback);
	}
	offAll() {
		this._events = new Map();
	}
	trigger(eventName, context) {
		return (event = {}) => {
			this.emit(
				eventName,
				Object.assign(Object.assign({}, event || {}), context || {})
			);
		};
	}
}
