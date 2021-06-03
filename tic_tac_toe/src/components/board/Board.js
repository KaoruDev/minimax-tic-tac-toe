import React from 'react';
import Square from '../square/Square';
import styles from './Board.module.css';
import {useDispatch, useSelector} from "react-redux";
import {batchArray} from "../../utils/arrayUtils";
import {reset} from "./boardSlice";

export default function Board() {
  const squares = useSelector((state) => state.board.squareStates);
  const gameState = useSelector((state) => state.board.gameState);
  const squaresByRow = batchArray(squares, 3);
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
                  <Square marker={marker} idx={idx} gameState={gameState}/>
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
      <h3 className={styles.header}>{gameState}</h3>
      <div className={styles.board}>
        {renderRows()}
      </div>
      <div>
        <button className={styles.resetButton} onClick={() => dispatch(reset())}>RESET</button>
      </div>
    </>
  );
}
