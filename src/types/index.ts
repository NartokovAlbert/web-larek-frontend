interface IProduct {
  category: string;
  description: string;
  id: string;
  image: string;
  price: number;
  title: string;
}


interface ICatalog {
  products: IProduct[];
  updateProducts: (products: IProduct[]) => void;
}

interface IModalData {
  content: HTMLElement;
}

interface IBasket {
  products: IProduct[];
  totalPrice: number;
  totalCount: number;
  haveProduct: (product: IProduct) => boolean;
  remove:(product: IProduct) => void;
  add:(product: IProduct) => void;
  clear:() => void;
}
interface IOrder {
  paymentMethod: PaymentMethod;
  address: string;
  email: string;
  phone: string;
  clear:() => void;
}
interface ISaveOrderResponse {
  id: string;
  total: number;
}
enum PaymentMethod {
  card = 'Безналичный',
  cash = 'Наличный',
}

