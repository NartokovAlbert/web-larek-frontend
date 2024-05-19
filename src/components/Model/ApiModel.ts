<<<<<<< HEAD
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
=======
import { ApiListResponse, Api } from '../base/api'
import { IProductItem } from '../../types';

export class ApiModel extends Api {
  cdn: string;
  total: number;
  items: IProductItem[];
  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
  }
  //получаем массив объектов(карточек) с сервера
  getListProductCard(): Promise<IProductItem[]> {
    return this.get('/product').then((data: ApiListResponse<IProductItem>) =>
      data.items.map((item) => ({
        ...item,
        image: this.cdn + item.image,
      }))
    );
  }
  getProductCard() {
    this.get('/product')
      .then((data: ApiListResponse<IProductItem>) => {
        this.total = data.total;
        this.items = data.items;
      })
  }
}
>>>>>>> aa47d7e7c405df101da3df5302317082db2f4452
