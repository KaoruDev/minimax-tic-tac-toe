import React from 'react';
import styles from './Square.module.css';
import {useDispatch} from "react-redux";
import {move} from "../board/boardSlice";


export default function Square(props) {
  const dispatch = useDispatch();
  const buttonClass = props.marker ?
    `${styles.square} ${styles.filledSquare}` :
    `${styles.square} ${styles.emptySquare}`;

  const onClick = () => {
    if (!props.marker) dispatch(move({squareIdx: props.idx}));
  };

  return (
    <button className={buttonClass} onClick={onClick} >
      {props.marker || 'n'}
    </button>
  );
}