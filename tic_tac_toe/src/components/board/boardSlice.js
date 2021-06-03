import {createSlice} from "@reduxjs/toolkit";
import * as MarkerUtils from '../../utils/markerUtils';
import * as BoardUtils from '../../utils/boardUtils';
import BoardLogic from "./BoardLogic";

export const GAME_STATES = {
  playing: 'playing',
  playerWon: 'YOU WIN!',
  playerLose: 'YOU LOSE!',
  draw: 'DRAW'
}

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    gameState: GAME_STATES.playing,
    squareStates: Array(9).fill(null),
    playerMarker: 'x'
  },
  reducers: {
    move: (state, { payload }) => {
      let board = state.squareStates;
      board[payload.squareIdx] = state.playerMarker;
      let computerMarker = MarkerUtils.oppositeMarker(state.playerMarker);

      const boardLogic = new BoardLogic({board, computerMarker});

      if (boardLogic.playerWon()) {
        state.gameState = GAME_STATES.playerWon;
        return
      } else if (boardLogic.draw()) {
        state.gameState = GAME_STATES.draw;
        return
      } else {
        let nextMove = boardLogic.nextBestMove();
        board[nextMove] = computerMarker;
      }

      if (boardLogic.hasWon(board, computerMarker)) {
        state.gameState = GAME_STATES.playerLose;
      }

      if (!BoardUtils.availableMoves(board).length) {
        state.gameState = GAME_STATES.draw;
      }
    }
  }
});

export const { move } = boardSlice.actions;
export default boardSlice.reducer;
