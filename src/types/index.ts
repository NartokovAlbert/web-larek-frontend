export interface IProductItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IActions {
  onClick: (event: MouseEvent) => void;
}


export interface IOrderForm {
email?: string;
total?: string | number;
payment?: string;
address?: string;
phone?: string;
}


export interface IOrderLot{
  payment: string;
  email: string;
  phone: string;
  address: string;
  items: string[];
  total: number;
}

export interface IOrder extends IOrderForm {
  items: string[];
}

export interface IOrderResult {
  id: string;
  total: number;
}


export type FormErrors = Partial<Record<keyof IOrder, string>>;

export enum paymentSelection {
  card = 'Безналичный',
  cash = 'Наличный',
}

