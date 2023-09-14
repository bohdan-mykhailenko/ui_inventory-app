export interface Order {
  id: number;
  title: string;
  date: string;
  description: string;
  productCount?: number;
  sumOfPrice?: {
    value: number;
    symbol?: string;
  }[];
}
