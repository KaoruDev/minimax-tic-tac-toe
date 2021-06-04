import styles from './Score.module.css'

export default function Score(props) {
  return (
    <div>
      <h2 className={styles.scoreHeader}>Score</h2>
      <p>
        Player: {props.playerScore} Computer: {props.computerScore} Draws: {props.draws}
      </p>
    </div>
  );
}