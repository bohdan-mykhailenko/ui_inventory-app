export interface Product {
  id: number;
  serialNumber: string;
  isNew: boolean;
  isRepairing: boolean;
  photo: File | string | Blob | null;
  title: string;
  type: string;
  specification: string;
  guarantee: {
    start: string;
    end: string;
  };
  price: {
    value: number;
    symbol: string;
    isDefault: number;
  }[];
  order_id: number;
  date: string;
}

export interface ProductFormData {
  serialNumber: string;
  isNew: boolean;
  isRepairing: boolean;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guaranteeStart: string;
  guaranteeEnd: string;
  priceUSD: number | null;
  priceUAH: number | null;
  order_id: number | null;
  date: string;
}
