import { configureStore } from '@reduxjs/toolkit';
import squareReducer from './components/square/squareSlice';

export default configureStore({
  reducer: {
    square: squareReducer,
  },
});