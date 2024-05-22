import './scss/styles.scss';
import { CDN_URL, API_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { ApiModel } from './components/Model/ApiModel';
import { DataModel } from './components/Model/DataModel';
import { Card } from './components/View/Card';
import { CardPreview } from './components/View/CardPreview';
import { Modal } from './components/View/Modal';
import { ensureElement } from './utils/utils';
import { BasketModel } from './components/Model/BasketModel';
import { Basket } from './components/View/Basket';
import { BasketItem } from './components/View/BasketItem';
import { FormModel } from './components/Model/FormModel';
import { Order } from './components/View/FormOrder';
import { Contacts } from './components/View/FormContacts';
import { Success } from './components/View/Success';
const cardCatalogTemplate = document.querySelector('#card-catalog');
const cardPreviewTemplate = document.querySelector('#card-preview');
const basketTemplate = document.querySelector('#basket');
const cardBasketTemplate = document.querySelector('#card-basket');
const orderTemplate = document.querySelector('#order');
const contactsTemplate = document.querySelector('#contacts');
const successTemplate = document.querySelector('#success');
const apiModel = new ApiModel(CDN_URL, API_URL);
const events = new EventEmitter();
const dataModel = new DataModel(events);
const modal = new Modal(ensureElement('#modal-container'), events);
const basket = new Basket(basketTemplate, events);
const basketModel = new BasketModel();
const formModel = new FormModel(events);
const order = new Order(orderTemplate, events);
const contacts = new Contacts(contactsTemplate, events);
/********** Отображения карточек товара на странице **********/
events.on('productCards:receive', () => {
	dataModel.productCards.forEach((item) => {
		const card = new Card(cardCatalogTemplate, events, {
			onClick: () => events.emit('card:select', item),
		});
		ensureElement('.gallery').append(card.render(item));
	});
});
/********** Получить объект данных "IProductItem" карточки по которой кликнули **********/
events.on('card:select', (item) => {
	dataModel.setPreview(item);
});
/********** Открываем модальное окно карточки товара **********/
events.on('popupCard:open', (item) => {
	const cardPreview = new CardPreview(cardPreviewTemplate, events);
	modal.content = cardPreview.render(item);
	modal.render();
});
/********** Добавление карточки товара в корзину **********/
events.on('card:addBasket', () => {
	basketModel.setSelectedСard(dataModel.selectedCard); // добавить карточку товара в корзину
	basket.renderHeaderBasketCounter(basketModel.getCounter()); // отобразить количество товара на иконке корзины
	modal.close();
});
/********** Открытие модального окна корзины **********/
events.on('basket:open', () => {
	basket.renderSumAllProducts(basketModel.getSumAllProducts()); // отобразить сумма всех продуктов в корзине
	let i = 0;
	basket.items = basketModel.basketProducts.map((item) => {
		const basketItem = new BasketItem(cardBasketTemplate, events, {
			onClick: () => events.emit('basket:basketListDelete', item),
		});
		i = i + 1;
		return basketItem.render(item, i);
	});
	modal.content = basket.render();
	modal.render();
});
/********** Удаление карточки товара из корзины **********/
events.on('basket:basketListDelete', (item) => {
	basketModel.deleteCardToBasket(item);
	basket.renderHeaderBasketCounter(basketModel.getCounter()); // отобразить количество товара на иконке корзины
	basket.renderSumAllProducts(basketModel.getSumAllProducts()); // отобразить сумма всех продуктов в корзине
	let i = 0;
	basket.items = basketModel.basketProducts.map((item) => {
		const basketItem = new BasketItem(cardBasketTemplate, events, {
			onClick: () => events.emit('basket:basketListDelete', item),
		});
		i = i + 1;
		return basketItem.render(item, i);
	});
});
/********** Открытие модального окна "способа оплаты" и "адреса доставки" **********/
events.on('order:open', () => {
	modal.content = order.render();
	modal.render();
	formModel.items = basketModel.basketProducts.map((item) => item.id); // передаём список id товаров которые покупаем
});
events.on('order:paymentСhoice', (button) => {
	formModel.payment = button.name;
}); // передаём способ оплаты
/********** Отслеживаем изменение в поле в вода "адреса доставки" **********/
events.on(`order:changeAddress`, (data) => {
	formModel.setOrderAddress(data.field, data.value);
});
/********** Валидация данных строки "address" и payment **********/
events.on('formErrors:address', (errors) => {
	const { address, payment } = errors;
	order.valid = !address && !payment;
	order.formErrors.textContent = Object.values({ address, payment })
		.filter((i) => !!i)
		.join('; ');
});
/********** Открытие модального окна "Email" и "Телефон" **********/
events.on('contacts:open', () => {
	formModel.total = basketModel.getSumAllProducts();
	modal.content = contacts.render();
	modal.render();
});
/********** Отслеживаем изменение в полях вода "Email" и "Телефон" **********/
events.on(`contacts:changeInput`, (data) => {
	formModel.setOrderData(data.field, data.value);
});
/********** Валидация данных строки "Email" и "Телефон" **********/
events.on('formErrors:change', (errors) => {
	const { email, phone } = errors;
	contacts.valid = !email && !phone;
	contacts.formErrors.textContent = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
});
/********** Открытие модального окна "Заказ оформлен" **********/
events.on('success:open', () => {
	apiModel
		.postOrderLot(formModel.getOrderLot())
		.then((data) => {
			console.log(data); // ответ сервера
			const success = new Success(successTemplate, events);
			modal.content = success.render(basketModel.getSumAllProducts());
			basketModel.clearBasketProducts(); // очищаем корзину
			basket.renderHeaderBasketCounter(basketModel.getCounter()); // отобразить количество товара на иконке корзины
			modal.render();
		})
		.catch((error) => console.log(error));
});
events.on('success:close', () => modal.close());
/********** Блокируем прокрутку страницы при открытие модального окна **********/
events.on('modal:open', () => {
	modal.locked = true;
});
/********** Разблокируем прокрутку страницы при закрытие модального окна **********/
events.on('modal:close', () => {
	modal.locked = false;
});
/********** Получаем данные с сервера **********/
apiModel
	.getListProductCard()
	.then(function (data) {
		dataModel.productCards = data;
	})
	// .then(dataModel.setProductCards.bind(dataModel))
	.catch((error) => console.log(error));
