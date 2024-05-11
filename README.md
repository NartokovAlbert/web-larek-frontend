# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
                                                           АРХИТЕКТУРА:

В проекте применяется  MVP (Model-View-Presenter), который разделяет приложение на три основных компонента: модель, представление и презентер.

                                      Базовый код использует такие классы,методы и интерфейсы как:

                                                            Класс:

Api основной класс для взаимодействия с API. Он предоставляет свойства и методы для выполнения запросов и обработки ответов от сервера.

                                                            Методы:


handleResponse(response: Response) обрабатывает ответ от сервера
                                                      Класс EventEmitter
get(url: string) выполняет GET-запрос
post(uri: string, data: object, method: ApiPostMethods = 'POST') выполняет POST-запрос с переданными данными
Реализует интерфейс IEvents, который является брокером событий. Он позволяет регистрировать обработчики событий, инициировать события с данными, слушать все события, сбрасывать обработчики и создавать коллбеки-триггеры для генерации событий при вызове.


on метод для регистрации обработчика на определенное событие
off метод для удаления обработчика с определенного события
onAll метод для регистрации обработчика на все события
offAll метод для удаления всех обработчиков события
trigger метод для создания коллбека-триггера, который генерирует событие при вызове
emit метод для инициации события

                                                       Компоненты модели данных 

                                                            Класс:ProductsApiModel

Расширяет базовый класс Api и реализует интерфейс IProductApi. Предназначен для взаимодействия с API продуктов и заказов. Принимает параметр cdn (URL для CDN изображений). Обеспечивает основные функции для работы с продуктами и оформления заказов в приложении, включая загрузку данных о продуктах и отправку информации о заказах.

                                                            Методы:
getProductList(): Promise<IProduct[]> получает список продуктов с сервера и возвращает промис с массивом продуктов
postOrder(order: IOrder): Promise<ISaveOrderResponse> отправляет данные заказа на сервер и возвращает промис с ответом сервера, содержащим идентификатор и общую стоимость заказа
                                                      Класс BasketModel:
Реализует интерфейс IBasket, представляющий модель корзины. Содержит массив продуктов, общую цену и общее количество продуктов. Предоставляет методы для добавления и удаления продуктов из корзины, а также очистки корзины.

                                                      Интерфейс ShopList

Описание корзины: список товаров, возможность добавить или удалить товары из корзины.

                                                      Класс OrderModel

Реализует интерфейс IOrder. Содержит свойства для описания заказа пользователя: способ оплаты, адрес, электронная почта и телефон. Предоставляет метод для очистки заказа.

                                                      Интерфейс IOrder

Описание заказа пользователя: способ оплаты, адрес, телефон, электронная почта. Также предоставляет возможность очистить заказ.

Компоненты представления

                                                      Класс CardCatalogView

Отвечает за представление карточки продукта в каталоге. Предоставляет метод для отображения данных продукта на карточке, устанавливая изображение, название, цену и категорию продукта.

                                                          Класс PageView

Представляет представление страницы. Содержит свойства для счетчика, каталога продуктов, обертки страницы и корзины. Предоставляет методы для обновления счетчика корзины и каталога продуктов, а также свойство для блокировки/разблокировки прокрутки страницы при открытом модальном окне.

                                                      Класс CardPreviewView

Отвечает за предварительный просмотр карточки продукта. Предоставляет метод для отображения данных продукта в предварительном просмотре, устанавливая описание, категорию, изображение, название и цену продукта.

                                                        Класс BasketView

Представляет представление корзины. Предоставляет метод для отображения данных корзины, создавая карточки продуктов и обновляя общую цену корзины.

                                                        Класс OrderForm

Отвечает за отображение формы ввода метода оплаты и адреса. Содержит свойства для кнопок выбора способа оплаты, кнопки подтверждения заказа, сообщения об ошибке, поля ввода адреса, выбранного способа оплаты и адреса. Предоставляет методы для валидации формы и отображения формы.

                                                        Класс ContactsForm

Отвечает за отображение формы ввода имени и электронной почты пользователя. Содержит свойства для сообщения об ошибке, полей ввода электронной почты и телефона, а также свойства для хранения электронной почты и номера телефона. Предоставляет методы для валидации формы и отображения формы.

                                                        Класс SuccessView

Отвечает за отображение сообщения об успешном заказе. Содержит свойства для описания и кнопки закрытия. Предоставляет метод для отображения данных успешного заказа.

                                                        Класс Modal

Отвечает за отображение контента в модальных окнах. Содержит свойства для кнопки закрытия и контента модального окна. Предоставляет методы для установки контента модального окна, открытия и закрытия модального окна, а также отображения данных в модальном окне.

Ключевые типы данных
PaymentMethod
Вид оплаты

export enum PaymentMethod {
    card = "Безналичный",
    cash = "Наличный"
}
