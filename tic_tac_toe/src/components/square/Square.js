import React from 'react';
import styles from './Square.module.css';
import {useDispatch} from "react-redux";
import {GAME_STATES, move} from "../board/boardSlice";


export default function Square(props) {
  const dispatch = useDispatch();
  const disabled = props.marker || props.gameState !== GAME_STATES.playing;

  const buttonClasses = [styles.square];

  if (disabled) buttonClasses.push(styles.disabled);
  if (!props.marker) buttonClasses.push(styles.emptySquare);


  const onClick = () => {
    if (!disabled) dispatch(move({squareIdx: props.idx}));
  };

  return (
    <button className={buttonClasses.join(' ')} onClick={onClick} >
      {props.marker || 'n'}
    </button>
  );
}