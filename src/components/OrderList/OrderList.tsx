import React from 'react';
import { Order } from '../../types/Order';
import { orders } from '../../data/data';
import { OrderItem } from '../OrderItem';

interface OrderListProps {
  orders: Order[];
}

export const OrderList: React.FC<OrderListProps> = () => {
  return (
    <ul>
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </ul>
  );
};
