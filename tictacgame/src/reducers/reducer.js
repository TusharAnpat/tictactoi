
const initialState = {
    board: Array(9).fill(''),
    currentPlayer: 'X',
  };
  
  const ticTacToeReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_BOARD':
        const newBoard = [...state.board];
        newBoard[action.payload.index] = action.payload.player;
        return { ...state, board: newBoard };
      case 'SWITCH_PLAYER':
        return {
          ...state,
          currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
        };
      case 'RESET_GAME':
        return initialState;
      default:
        return state;
    }
  };
  
  export default ticTacToeReducer;
  