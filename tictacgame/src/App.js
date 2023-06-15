import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateBoard, switchPlayer, resetGame } from './actions/action';
import { Box, Button, FormLabel } from '@mui/material'
import './App.css';


const App = () => {
  const [winnerPlayer, setWinnerPlayer] = useState(null);
  const [selectedBox, setSelectedBox] = useState(1);
  const [winXCount, setwinXCount] = useState(0);
  const [winOCount, setwinOCount] = useState(0);

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
        console.log('value check---->', board[a])
        return;
      }
    }

    if (!board.includes("")) {
      setWinnerPlayer("draw");
    }
  };

  const handleResetClick = () => {
    dispatch(resetGame());
    console.log('players winnerPlayer', winnerPlayer);
    if (winnerPlayer === 'X') {
      setwinXCount((preState) => preState + 1)
    }else if(winnerPlayer==='O'){
      setwinOCount((preState) =>preState + 1)
    }else{
      return
    }
    setWinnerPlayer(null);
  };

  const renderCell = (index) => {
    return (
      <div style={{ fontSize: 'bold' }} className="cell" onClick={() => handleCellClick(index)}>
        {board[index]}
      </div>
    );
  };

  const handleBoxClick = (boxNumber) => {
    setSelectedBox(boxNumber);
    dispatch(updateBoard(currentPlayer));
    console.log('***update', dispatch(updateBoard(currentPlayer)));
    dispatch(switchPlayer());
  };

  return (
    <div className="App">
      <div className='tictac'>
        <div style={{ padding: '10px' }}>
          <div className='btnSelect'>
            <Box onClick={() => handleBoxClick(1)} sx={{ display: 'flex', justifyContent: 'space-around', border: '1px solid rgb(62 72 82 / 50%)', borderBottom: selectedBox === 1 ? '2px solid #14bdac' : '1px solid black' }} >X <span style={{ marginLeft: '10px', lineheight: '20px' }}>{winXCount}</span></Box>
            <Box onClick={() => handleBoxClick(2)} sx={{ display: 'flex', justifyContent: 'space-around', border: '1px solid rgb(62 72 82 / 50%)', borderBottom: selectedBox === 2 ? '2px solid #14bdac' : '1px solid black' }}>O <span style={{ marginLeft: '10px', lineheight: '20px' }}>{winOCount}</span></Box>
          </div>

          {selectedBox && selectedBox === 2 ? <FormLabel>O Turn</FormLabel> : <FormLabel>Start game or select player</FormLabel>}
        </div>
        <div style={{ backgroundColor: '#14bdac', padding: '10px 0' }}>
          <div className="board">
            {
              board.map((ele, index) => {
                return renderCell(index)
              })
            }
          </div>
        </div>
        <div style={{ display: 'flex', direction: 'row', margintop: '15px' }}>
          {winnerPlayer && (
            <span className="message">
              {winnerPlayer === "draw" ? "Match is draw!" : `Player ${winnerPlayer} wins`}
            </span>
          )}
          <Button variant='standard' onClick={handleResetClick}>Click Restart</Button>
        </div>
      </div>
    </div>
  );
};

export default App;
