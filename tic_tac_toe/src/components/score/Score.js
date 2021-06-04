import styles from './Score.module.css'

/**
 * Component that renders the Player's and computer's score and the number of times a game ended in a draw.
 */
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