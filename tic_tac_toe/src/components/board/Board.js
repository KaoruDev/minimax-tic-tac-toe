import React from 'react';
import Square from '../square/Square';
import styles from './Board.module.css';
import {useSelector} from "react-redux";
import {batchArray} from "../../utils/arrayUtils";

export default function Board() {
  const squares = useSelector((state) => state.board.squareStates);
  const squaresByRow = batchArray(squares, 3);

  const renderRows = () => (
    squaresByRow.map((row, rowIdx) => (
      <React.Fragment key={rowIdx}>
        <div className={styles.row}>
          {
            row.map((marker, sqIdx) => {
              const idx = sqIdx + rowIdx * 3;
              return (
                <React.Fragment key={idx} >
                  <Square marker={marker} idx={idx}/>
                </React.Fragment>
              );
            })
          }
        </div>
      </React.Fragment>
    ))
  );

  return (
    <div className={styles.board}>
      {renderRows()}
    </div>
  );
}
