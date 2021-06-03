import React from 'react';
import Square from './Square';
import styles from './Board.module.css';

export default class Board extends React.Component {
  renderRow() {
    return (
      <div className={styles.row}>
        <Square />
        <Square />
        <Square />
      </div>
    );
  }

  render() {
    return (
      <div className={styles.board}>
        {this.renderRow()}
        {this.renderRow()}
        {this.renderRow()}
      </div>
    );
  }
}