import React from "react";
import "./Game.css";
import { useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

function Game() {
  const { width, height } = useWindowSize();

  const [board, setboard] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [xturn, setXturn] = useState(true);

  //decalartion of winner//
  const decidewinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]; //destructing of lines value as a,b,c//
      if (board[a] !== null && board[a] === board[b] && board[b] === board[c]) {
        console.log("Winner is", board[a]);
        return board[a];
      }
    }
    return null;
  };
  const winner = decidewinner(board);

  const handleClick = (index) => {
    if (winner === null && !board[index]) {
      const boardcopy = [...board];
      boardcopy[index] = xturn ? "X" : "O";
      setboard(boardcopy);
      setXturn(!xturn);
    }
  };

  return (
    <div className="full-box">
      {winner ? <Confetti width={width} height={height} gravity={0.05} /> : ""}
      <div className="board">
        {board.map((val, index) => (
          <GameBox val={val} onPlayerClick={() => handleClick(index)} />
        ))}
      </div>
      {winner ? <h2> Winner is {winner}</h2> : ""}
    </div>
  );
}

function GameBox({ onPlayerClick, val }) {
  const styles = { color: val === "X" ? "red" : "green" }; //conditional styling//
  return (
    <div style={styles} onClick={onPlayerClick} className="game-box">
      {val}
    </div>
  );
}
export default Game;
