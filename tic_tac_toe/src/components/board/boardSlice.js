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

/**
 * Reducer responsible for reacting to events generated from the board.
 */
export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    ...INITIAL_STATE,
    playerScore: 0,
    computerScore: 0,
    draws: 0
  },
  reducers: {
    /**
     * Resets the board's state, but keeps score.
     */
    reset: (state) => {
      state.gameState = GAME_STATES.playing;
      state.squareStates = [...INITIAL_STATE.squareStates];
      state.playerMarker = INITIAL_STATE.playerMarker;
    },
    /**
     * Reacts to a player's move (click of a square), this is what moves the game forward.
     */
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
    },
    /**
     * A player may allow the computer to go first. This action will
     *
     * - determine a move to take on behalf of the computer and also
     * - Set the player's marker to 'o', instead of 'x', because 'x' goes first.
     */
    computerStart: (state) => {
      let computerMarker = state.playerMarker;
      state.playerMarker = MarkerUtils.oppositeMarker(state.playerMarker);
      let board = state.squareStates;
      const boardLogic = new BoardLogic({board, computerMarker});
      let nextMove = boardLogic.nextBestMove();
      board[nextMove] = computerMarker;
      state.squareStates = board;
    }
  }
});

export const { move, reset, computerStart } = boardSlice.actions;
export default boardSlice.reducer;
