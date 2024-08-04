// script.js
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartButton');
const gameStatus = document.getElementById('gameStatus');
const darkModeToggle = document.getElementById('darkModeToggle');

let currentPlayer = 'X'; // Player starts first
let gameState = Array(9).fill(null);
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (event) => {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (gameState[cellIndex] !== null || !isGameActive || currentPlayer !== 'X') {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        gameStatus.textContent = `${currentPlayer} wins!`;
        isGameActive = false;
    } else if (gameState.every(cell => cell !== null)) {
        gameStatus.textContent = `It's a draw!`;
        isGameActive = false;
    } else {
        currentPlayer = 'O';
        aiMove();
    }
};

const aiMove = () => {
    if (!isGameActive) return;

    let availableCells = gameState
        .map((state, index) => state === null ? index : null)
        .filter(index => index !== null);

    // Simple AI: Random move
    let aiChoice = availableCells[Math.floor(Math.random() * availableCells.length)];

    gameState[aiChoice] = 'O';
    cells[aiChoice].textContent = 'O';

    if (checkWin()) {
        gameStatus.textContent = `O wins!`;
        isGameActive = false;
    } else if (gameState.every(cell => cell !== null)) {
        gameStatus.textContent = `It's a draw!`;
        isGameActive = false;
    } else {
        currentPlayer = 'X';
    }
};

const checkWin = () => {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }
    return false;
};

const restartGame = () => {
    gameState.fill(null);
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
    isGameActive = true;
    gameStatus.textContent = '';
};

const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
darkModeToggle.addEventListener('click', toggleDarkMode);
