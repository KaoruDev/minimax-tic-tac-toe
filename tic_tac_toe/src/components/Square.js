import React from 'react';
import styles from './Square.module.css';

export default class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }
  render() {
    return (<div className={styles.square}>
      {this.state.value || ''}
    </div>);
  }
}