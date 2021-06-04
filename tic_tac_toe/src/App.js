import './App.css';
import Board from './components/board/Board';
import {useSelector} from "react-redux";
import * as BoardUtils from "./utils/boardUtils";

export default function App() {
  const squares = useSelector((state) => state.board.squareStates);
  const started = !(BoardUtils.availableMoves(squares).length === 9);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Unbeatable Tic-Tac-Toe</h1>
      </header>
      <Board squares={squares} started={started}/>
    </div>
  );
}

