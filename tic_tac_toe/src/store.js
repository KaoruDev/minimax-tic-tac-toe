import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './components/board/boardSlice';

export default configureStore({
  reducer: {
    board: boardReducer,
  },
});