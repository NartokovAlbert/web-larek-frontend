import { Api } from '../base/api';
export class ApiModel extends Api {
    constructor(cdn, baseUrl, options) {
        super(baseUrl, options);
        this.cdn = cdn;
    }
    // получаем массив карточек с сервера
    async getListProductCard() {
        return this.get('/product').then((data) => data.items.map((item) => (Object.assign(Object.assign({}, item), { image: this.cdn + item.image }))));
    }
    // получаем ответ  по  заказу от сервера
    async postOrderLot(order) {
        return this.post(`/order`, order).then((data) => data);
    }
}
