import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

interface OrderState {
  isDetailedOrder: boolean;
  productsForOrder: Product[];
}

const initialState: OrderState = {
  isDetailedOrder: false,
  productsForOrder: [],
};

const ordersSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setIsDetailedOrder: (state, action: PayloadAction<boolean>) => {
      state.isDetailedOrder = action.payload;
    },

    setProductsForOrder: (state, action: PayloadAction<Product[]>) => {
      state.productsForOrder = action.payload;
    },
  },
});

export const { setIsDetailedOrder, setProductsForOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
