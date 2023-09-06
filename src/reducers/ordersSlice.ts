import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { Order } from '../types/Order';

interface OrderState {
  isOrderSelected: boolean;
  selectedOrder: Order | null;
  productsForOrder: Product[];
}

const initialState: OrderState = {
  isOrderSelected: false,
  selectedOrder: null,
  productsForOrder: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setIsOrderSelected: (state, action: PayloadAction<boolean>) => {
      state.isOrderSelected = action.payload;
    },

    setSelectedOrder: (state, action: PayloadAction<Order>) => {
      state.selectedOrder = action.payload;
    },

    setProductsForOrder: (state, action: PayloadAction<Product[]>) => {
      state.productsForOrder = action.payload;
    },
  },
});

export const { setIsOrderSelected, setSelectedOrder, setProductsForOrder } =
  ordersSlice.actions;
export default ordersSlice.reducer;
