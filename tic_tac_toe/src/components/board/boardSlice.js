import {createSlice} from "@reduxjs/toolkit";
import * as BoardLogic from './boardLogic';
import * as MarkerUtils from '../../utils/markerUtils';
import * as BoardUtils from '../../utils/boardUtils';
import {GAME_STATES} from "./boardLogic";

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    gameState: GAME_STATES.playing,
    squareStates: Array(9).fill(null),
    playerMarker: 'o',
  },
  reducers: {
    move: (state, { payload }) => {
      state.squareStates[payload.squareIdx] = state.playerMarker;

      if (BoardLogic.hasWon(state.squareStates)) {
        state.gameState = GAME_STATES.playerWins;
      } else if (!BoardUtils.availableMoves(state.squareStates).length) {
        state.gameState = GAME_STATES.draw;
      } else {
        let computerMarker = MarkerUtils.oppositeMarker(state.playerMarker);
        let computerMove = BoardLogic.evaluateBestMove(state.squareStates, computerMarker);

        state.squareStates[computerMove] = computerMarker;

        if (BoardLogic.hasWon(state.squareStates)) {
          state.gameState = GAME_STATES.computerWins;
        }
      }
    }
  }
});

export const { move } = boardSlice.actions;
export default boardSlice.reducer;
