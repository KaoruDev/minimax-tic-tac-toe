import {createSlice} from "@reduxjs/toolkit";

export const squareSlice = createSlice({
  name: 'square',
  initialState: {
    marker: null,
  },
  reducers: {
    move: (state, playerMarker) => {
      console.log('Current State', state);
      console.log('Actions', playerMarker);
      if (!state.marker) {
        state.marker = 'x';
      }
    }
  }
})

export const { move } = squareSlice.actions;
export default squareSlice.reducer;