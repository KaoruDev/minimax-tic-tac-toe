import React from 'react';
import styles from './Square.module.css';
import {useDispatch} from "react-redux";
import {move} from "../board/boardSlice";

/**
 * Component to render the state of a particular square in a tic-tac-toe board.
 *
 * The Square is clickable if no marker (x, y) as been assigned.
 * The Square is unclickable if a marker has been assigned to the square or if the game has ended.
 */
export default function Square(props) {
  const dispatch = useDispatch();
  const disabled = props.marker || props.gameEnded;

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