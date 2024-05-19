import { ApiListResult, Api } from '../base/api';
import { IOrderList,  IOrderListAll, IOrderItem } from '../../types';

export interface IApiModel {
	cdn?: string;
	items: IOrderItem[];
	getListProductCard: () => Promise<IOrderItem[]>;
	postOrderLot: (order: IOrderList) => Promise< IOrderListAll>;
}

export class ApiModel extends Api {
	cdn?: string;
	items: IOrderItem[];

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	// получаем массив карточек с сервера
	async getListProductCard(): Promise<IOrderItem[]> {
		return this.get('/product').then((data: ApiListResult<IOrderItem>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	// получаем ответ  по  заказу от сервера
	async postOrderLot(order: IOrderList): Promise< IOrderListAll> {
		return this.post(`/order`, order).then((data:  IOrderListAll) => data);
	}
}
