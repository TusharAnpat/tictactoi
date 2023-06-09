export const updateBoard = (index, player) => ({
    type: 'UPDATE_BOARD',
    payload: { index, player },
});

export const switchPlayer = () => ({
    type: 'SWITCH_PLAYER',
});

// export const RESET_GAME = 'RESET_GAME';

export const resetGame = () => ({
  type: 'RESET_GAME',
});