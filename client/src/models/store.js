import { configureStore } from '@reduxjs/toolkit';
import { mathReducer } from './reducers/mathReducer';

export const store = configureStore({
  reducer: {
    math: mathReducer,
  },
});

store.subscribe(() => {
  console.log('subscribe >>>', store.getState());
});
