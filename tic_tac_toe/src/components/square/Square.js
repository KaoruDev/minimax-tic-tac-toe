import React from 'react';
import styles from './Square.module.css';
import {useDispatch, useSelector} from "react-redux";
import {move} from "./squareSlice";


export default function Square() {
  const dispatch = useDispatch();
  const marker = useSelector((state) => state.square.marker);
  const buttonClass = marker ? styles.square : `${styles.square} ${styles.emptySquare}`;

  return (
    <button className={buttonClass} onClick={() => dispatch(move({playerMarker: 'x'}))}>
      {marker}
    </button>
  );
}