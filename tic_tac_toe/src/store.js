import { configureStore } from '@reduxjs/toolkit';
import squareReducer from './components/square/squareSlice';
import boardReducer from './components/board/boardSlice';

export default configureStore({
  reducer: {
    square: squareReducer,
    board: boardReducer,
  },
});