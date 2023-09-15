import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { Order } from '../types/Order';

interface ItemsState {
  isItemChanged: boolean;
  isOrderSelected: boolean;
  selectedOrder: Order | null;
  selectedProduct: Product | null;
  productsForOrder: Product[];
}

const initialState: ItemsState = {
  isItemChanged: false,
  isOrderSelected: false,
  selectedOrder: null,
  selectedProduct: null,
  productsForOrder: [],
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setIsItemChanged: (state, action: PayloadAction<boolean>) => {
      state.isItemChanged = action.payload;
    },

    setIsOrderSelected: (state, action: PayloadAction<boolean>) => {
      state.isOrderSelected = action.payload;
    },

    setSelectedOrder: (state, action: PayloadAction<Order>) => {
      state.selectedOrder = action.payload;
    },

    setSelectedProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
    },

    setProductsForOrder: (state, action: PayloadAction<Product[]>) => {
      state.productsForOrder = action.payload;
    },
  },
});

export const {
  setIsItemChanged,
  setIsOrderSelected,
  setSelectedOrder,
  setSelectedProduct,
  setProductsForOrder,
} = itemsSlice.actions;
export default itemsSlice.reducer;
