export class Api {
	constructor(baseUrl, options = {}) {
		var _a;
		this.baseUrl = baseUrl;
		this.options = {
			headers: Object.assign(
				{ 'Content-Type': 'application/json' },
				(_a = options.headers) !== null && _a !== void 0 ? _a : {}
			),
		};
	}
	async handleResponse(response) {
		var _a;
		if (response.ok) {
			return await response.json();
		} else {
			const data = await response.json();
			return Promise.reject(
				(_a = data.error) !== null && _a !== void 0 ? _a : response.statusText
			);
		}
	}
	async get(uri) {
		const response = await fetch(
			this.baseUrl + uri,
			Object.assign(Object.assign({}, this.options), { method: 'GET' })
		);
		return this.handleResponse(response);
	}
	async post(uri, data, method = 'POST') {
		const response = await fetch(
			this.baseUrl + uri,
			Object.assign(Object.assign({}, this.options), {
				method,
				body: JSON.stringify(data),
			})
		);
		return this.handleResponse(response);
	}
}
