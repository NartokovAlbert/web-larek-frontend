import { ApiListResult, Api } from '../base/api';
import { IOrderLot, IOrderResult, IProductItem } from '../../types';

export interface IApiModel {
	cdn: string;
	items: IProductItem[];
	getListProductCard: () => Promise<IProductItem[]>;
	postOrderLot: (order: IOrderLot) => Promise<IOrderResult>;
}

export class ApiModel extends Api {
	cdn: string;
	items: IProductItem[];

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	// получаем массив карточек с сервера
	getListProductCard(): Promise<IProductItem[]> {
		return this.get('/product').then((data: ApiListResult<IProductItem>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	// получаем ответ от сервера 
	postOrderLot(order: IOrderLot): Promise<IOrderResult> {
		return this.post(`/order`, order).then((data: IOrderResult) => data);
	}
}
