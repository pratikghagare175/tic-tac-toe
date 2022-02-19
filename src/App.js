import "./App.css";
import { useState } from "react";

const App = () => {
  const PLAYERX_WON = "PLAYER X WON";
  const PLAYERO_WON = "PLAYER O WON";
  const TIE = "TIE";

  /*
  [0] [1] [2]
  [3] [4] [5]
  [6] [7] [8]
  */

  const board = ["", "", "", "", "", "", "", "", ""];

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [tiles, setTiles] = useState(board);
  const [announce, setAnnounce] = useState(false);
  const [gameActive, setGameActive] = useState(true);
  const [currentPlayer, setCurrentPlayer] = useState("X");

  const handleResult = (check) => {
    let roundWon = false;

    for (let i = 0; i < 8; i++) {
      const winCondition = winningConditions[i];
      const a = check[winCondition[0]];
      const b = check[winCondition[1]];
      const c = check[winCondition[2]];

      if (a === "" || b === "" || c === "") {
        continue;
      }

      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      announceWinner(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
      setGameActive(false);
      return;
    }

    if (!check.includes("")) {
      announceWinner(TIE);
    }
  };

  const announceWinner = (type) => {
    switch (type) {
      case PLAYERX_WON:
        setAnnounce("PLAYER X WON !!!");
        break;

      case PLAYERO_WON:
        setAnnounce("PLAYER O WON !!!");
        break;

      case TIE:
        setAnnounce("IT's A TIE!!");
        break;
      default:
        setAnnounce(false);
        break;
    }
  };

  const updateBoard = (index) => {
    let newFormat = tiles.slice();
    newFormat[index] = currentPlayer;
    handleResult(newFormat);
    setTiles(newFormat);
  };

  const changePlayer = () => {
    if (currentPlayer === "X") {
      setCurrentPlayer("O");
    } else {
      setCurrentPlayer("X");
    }
  };

  const userAction = (index) => {
    if (gameActive) {
      updateBoard(index);
      changePlayer();
    }
  };

  const resetGame = () => {
    setTiles(board);
    setGameActive(true);
    setAnnounce(false);
    if (currentPlayer === "O") {
      changePlayer();
    }
  };
  return (
    <div className="background testing">
      <div className="title">
        <h1>Tic Tac Toe</h1>
      </div>
      <div className="display">
        Player <span className={`display-player player${currentPlayer}`}>{currentPlayer}</span>'s Turn
      </div>
      <div className="container">
        {tiles.map((val, index) => {
          return (
            <div key={index} className={`tile player${val}`} onClick={() => userAction(index)}>
              {val}
            </div>
          );
        })}
      </div>

      {announce && <div className="announce">{announce}</div>}
      <div className="controls">
        <button onClick={resetGame}>Reset</button>
      </div>
    </div>
  );
};

export default App;
