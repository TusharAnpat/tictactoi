import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateBoard, switchPlayer, resetGame } from './actions/action';
import { Button, FormLabel } from '@mui/material'
import './App.css';

const App = () => {
  const [winnerPlayer, setWinnerPlayer] = useState(null);

  const board = useSelector((state) => state.board);
  console.log('board initial', board);
  const currentPlayer = useSelector((state) => state.currentPlayer);
  console.log('---currentplayer', currentPlayer);
  const dispatch = useDispatch();
  console.log('board ---->>>>', board);
  const handleCellClick = (index) => {
    if (board[index] === '') {
      dispatch(updateBoard(index, currentPlayer));
      console.log('***update', dispatch(updateBoard(index, currentPlayer)));
      dispatch(switchPlayer());
      console.log('switch player', switchPlayer());
    }

    if (board[index] === "" && !winnerPlayer) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      checkWinPlayer(newBoard);
    }
  };

  const checkWinPlayer = (board) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinnerPlayer(board[a]);
        return;
      }
    }

    if (!board.includes("")) {
      setWinnerPlayer("draw");
    }
  };

  const handleResetClick = () => {
    dispatch(resetGame());
    setWinnerPlayer(null);
  };

  const renderCell = (index) => {
    return (
      <div style={{ fontSize: 'bold' }} className="cell" onClick={() => handleCellClick(index)}>
        {board[index]}
      </div>
    );
  };
  // const checkPlayerValue = (e) => {

  // }

  return (
    <div className="App">
      <div className='tictac'>
        <div className='btnSelect'>
          <Button style={{ border: '1px solid rgb(62 72 82 / 50%)', color: 'rgb(84, 84, 84)' }} onClick={null} variant="outlined">X</Button>
          <Button style={{ border: '1px solid rgb(62 72 82 / 50%)', color: 'rgb(84, 84, 84)' }} onClick={null} variant="outlined">O</Button>
        </div>
        <FormLabel>Start game or select player</FormLabel>
        <div className="board">
          {renderCell(0)}
          {renderCell(1)}
          {renderCell(2)}
          {renderCell(3)}
          {renderCell(4)}
          {renderCell(5)}
          {renderCell(6)}
          {renderCell(7)}
          {renderCell(8)}
        </div>
        {winnerPlayer && (
          <div className="message">
            {winnerPlayer === "draw" ? "Match is draw!" : `Player ${winnerPlayer} wins`}
            <Button variant='standard' onClick={handleResetClick}>Click Restart</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
