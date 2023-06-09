import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateBoard, switchPlayer, resetGame } from './actions/action';
import { Button, FormLabel } from '@mui/material'
import './App.css';

const App = () => {
  const [winnerPlayer, setWinnerPlayer] = useState(null);

  const board = useSelector((state) => state.board);
  const currentPlayer = useSelector((state) => state.currentPlayer);
  console.log('---currentplayer', currentPlayer);
  const dispatch = useDispatch();
  console.log('board ---->>>>', board);
  const handleCellClick = (index) => {
    if (board[index] === '') {
      dispatch(updateBoard(index, currentPlayer));
      console.log('***update', dispatch(updateBoard(index, currentPlayer)));
      dispatch(switchPlayer());
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

  return (
    <div className="App">
      <div className='tictac'>
        <div style={{padding: '10px'}}>
          <div className='btnSelect'>
            <Button style={{ border: '1px solid rgb(62 72 82 / 50%)',height: '40px',color: 'rgb(84, 84, 84)' }} onClick={null} variant="outlined">X</Button>
            <Button style={{ border: '1px solid rgb(62 72 82 / 50%)', height: '40px',color: 'rgb(84, 84, 84)' }} onClick={null} variant="outlined">O</Button>
          </div>
          <FormLabel>Start game or select player</FormLabel>
        </div>
        <div style={{ backgroundColor: '#14bdac',padding: '10px 0'}}>
          <div className="board">
            {
              board.map((ele,index)=>{
              return renderCell(index)})
            }
          </div>
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
