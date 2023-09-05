import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './reducers/filterSlice';
import ordersReducer from './reducers/ordersSlice';

const store = configureStore({
  reducer: {
    orders: ordersReducer,
    filter: filterReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
