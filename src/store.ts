import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './reducers/filterSlice';
import ordersReducer from './reducers/ordersSlice';
import modalsReducer from './reducers/modalsSlice';
import timerReducer from './reducers/timerSlice';

const store = configureStore({
  reducer: {
    orders: ordersReducer,
    filter: filterReducer,
    modals: modalsReducer,
    timer: timerReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
