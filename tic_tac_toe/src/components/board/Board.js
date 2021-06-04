import React from 'react';
import Square from '../square/Square';
import styles from './Board.module.css';
import {useDispatch, useSelector} from "react-redux";
import {batchArray} from "../../utils/arrayUtils";
import {computerStart, GAME_STATES, reset} from "./boardSlice";
import Score from "../score/Score";


/**
 * How many squares per row.
 */
const rowWidth = 3;

/**
 * Component representing a tic-tac-toe board. At the beginning of a game, we wait for the human player to decide to
 * go first (by making a move) or by letting the computer go first.
 *
 * Renders
 * - A Score board to keep track of how many times a game ended in a draw or
 * the computer winning (cause the player should never win lol)
 *
 * - Rows of Square components representing a tic-tac-toe board
 *
 * - Header to display the state of the game (empty if a game is ongoing).
 *
 * - Button to restart a game.
 *
 * - Button to allow the computer to go first.
 */
export default function Board(props) {
  const squares = props.squares;
  const started = props.started;
  const gameState = useSelector((state) => state.board.gameState);
  const score = useSelector((state) => ({
    draws: state.board.draws,
    playerScore: state.board.playerScore,
    computerScore: state.board.computerScore,
  }));

  const squaresByRow = batchArray(squares, rowWidth);
  const dispatch = useDispatch();

  const renderRows = () => (
    squaresByRow.map((row, rowIdx) => (
      <React.Fragment key={rowIdx}>
        <div className={styles.row}>
          {
            row.map((marker, sqIdx) => {
              const idx = sqIdx + rowIdx * 3;
              return (
                <React.Fragment key={idx} >
                  <Square marker={marker} idx={idx} gameEnded={gameState !== GAME_STATES.playing}/>
                </React.Fragment>
              );
            })
          }
        </div>
      </React.Fragment>
    ))
  );

  return (
    <>
      <Score draws={score.draws} playerScore={score.playerScore} computerScore={score.computerScore}/>
      <h3 className={styles.header}>{gameState}</h3>
      <div className={styles.board}>
        {renderRows()}
      </div>
      <div>
        {
          started ?
            null :
            <button className={styles.boardButton} onClick={() => dispatch(computerStart())}>COMPUTER START</button>
        }
        <button className={styles.boardButton} onClick={() => dispatch(reset())}>RESET</button>
      </div>
    </>
  );
}
