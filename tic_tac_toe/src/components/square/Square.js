import React from 'react';
import styles from './Square.module.css';
import {useDispatch, useSelector} from "react-redux";
import {move} from "../board/boardSlice";


export default function Square(props) {
  const dispatch = useDispatch();
  const buttonClass = props.marker ? styles.square : `${styles.square} ${styles.emptySquare}`;

  return (
    <button className={buttonClass} onClick={() => dispatch(move({squareIdx: props.idx}))}>
      {props.marker || 'n'}
    </button>
  );
}