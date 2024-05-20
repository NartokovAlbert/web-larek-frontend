import { Api } from '../base/api';
export class ApiModel extends Api {
	constructor(cdn, baseUrl, options) {
		super(baseUrl, options);
		this.cdn = cdn;
	}
	// получаем массив объектов(карточек) с сервера
	getListProductCard() {
		return this.get('/product').then((data) =>
			data.items.map((item) =>
				Object.assign(Object.assign({}, item), { image: this.cdn + item.image })
			)
		);
	}
	// получаем ответ от сервера по сделанному заказу
	postOrderLot(order) {
		return this.post(`/order`, order).then((data) => data);
	}
}
