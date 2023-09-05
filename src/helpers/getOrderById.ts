import { Order } from '../types/Order';

export const getOrderById = (orderId: number, orders: Order[]) => {
  const foundOrder = orders.find((order: Order) => order.id === orderId);

  return foundOrder;
};
