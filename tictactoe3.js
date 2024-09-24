const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('gameStatus');
const playerXScoreElem = document.getElementById('playerX');
const playerOScoreElem = document.getElementById('playerO');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let board = Array(9).fill(null);
let playerXScore = 0;
let playerOScore = 0;
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== null || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        gameStatus.textContent = `Player ${currentPlayer} wins!`;
        updateScore();
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== null)) {
        gameStatus.textContent = 'It\'s a draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

function updateScore() {
    if (currentPlayer === 'X') {
        playerXScore++;
        playerXScoreElem.textContent = `Player X: ${playerXScore}`;
    } else {
        playerOScore++;
        playerOScoreElem.textContent = `Player O: ${playerOScore}`;
    }
}

function resetGame() {
    board.fill(null);
    cells.forEach(cell => (cell.textContent = ''));
    gameActive = true;
    currentPlayer = 'X';
    gameStatus.textContent = `Player X's turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
