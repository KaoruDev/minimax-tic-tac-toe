import {createSlice} from "@reduxjs/toolkit";
import {squareSlice} from "../square/squareSlice";

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    squareStates: Array(9).fill(null),
    isPlayerTurn: true,
    currentMarker: 'o',
  },
  reducers: {
    move: (state, { payload }) => {
      console.log('move payload', payload)
      if (!state.squareStates[payload.squareIdx]) {
        state.squareStates[payload.squareIdx] = state.currentMarker;
      }

      if (state.currentMarker === 'o') {
        state.currentMarker = 'x';
      } else {
        state.currentMarker = 'o';
      }
    }
  }
});

export const { move } = boardSlice.actions;
export default boardSlice.reducer;
