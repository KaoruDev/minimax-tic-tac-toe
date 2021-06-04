import {createSlice} from "@reduxjs/toolkit";
import * as MarkerUtils from '../../utils/markerUtils';
import * as BoardUtils from '../../utils/boardUtils';
import BoardLogic from "./BoardLogic";

export const GAME_STATES = {
  playing: '',
  playerWon: 'YOU WIN!',
  playerLose: 'YOU LOSE!',
  draw: 'DRAW'
};

const INITIAL_STATE = {
  gameState: GAME_STATES.playing,
  squareStates: Array(9).fill(null),
  playerMarker: 'x'
};

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    ...INITIAL_STATE,
    playerScore: 0,
    computerScore: 0,
    draws: 0
  },
  reducers: {
    reset: (state) => {
      state.gameState = GAME_STATES.playing;
      state.squareStates = [...INITIAL_STATE.squareStates];
      state.playerMarker = INITIAL_STATE.playerMarker;
    },
    move: (state, { payload }) => {
      let board = state.squareStates;
      board[payload.squareIdx] = state.playerMarker;
      let computerMarker = MarkerUtils.oppositeMarker(state.playerMarker);

      const boardLogic = new BoardLogic({board, computerMarker});

      if (boardLogic.playerWon()) {
        state.gameState = GAME_STATES.playerWon;
        state.playerScore += 1;
        return
      } else if (boardLogic.draw()) {
        state.gameState = GAME_STATES.draw;
        state.draws += 1;
        return
      } else {
        let nextMove = boardLogic.nextBestMove();
        board[nextMove] = computerMarker;
      }

      if (boardLogic.hasWon(board, computerMarker)) {
        state.gameState = GAME_STATES.playerLose;
        state.computerScore += 1;
      }

      if (!BoardUtils.availableMoves(board).length) {
        state.gameState = GAME_STATES.draw;
        state.draws += 1;
      }
    }
  }
});

export const { move, reset } = boardSlice.actions;
export default boardSlice.reducer;
