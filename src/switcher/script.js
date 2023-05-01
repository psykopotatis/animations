const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const ROWS = 5;
const COLS = 5;
const BLOCK_SIZE = 50;

canvas.width = COLS * BLOCK_SIZE;
canvas.height = ROWS * BLOCK_SIZE;

// colors for the blocks
const COLORS = [
	'red',
	'green',
	'blue',
	'yellow',
	'purple'
];

// create the game board
let board = [];
for (let i = 0; i < ROWS; i++) {
	board[i] = [];
	for (let j = 0; j < COLS; j++) {
		board[i][j] = Math.floor(Math.random() * COLORS.length);
	}
}

// draw the game board
function drawBoard() {
	for (let i = 0; i < ROWS; i++) {
		for (let j = 0; j < COLS; j++) {
			ctx.fillStyle = COLORS[board[i][j]];
			ctx.fillRect(j * BLOCK_SIZE, i * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
		}
	}
}

// swap two blocks on the game board
function swapBlocks(row1, col1, row2, col2) {
	let temp = board[row1][col1];
	board[row1][col1] = board[row2][col2];
	board[row2][col2] = temp;
}

// check if there are any matches on the game board
function checkMatches() {
	for (let i = 0; i < ROWS; i++) {
		for (let j = 0; j < COLS; j++) {
			if (board[i][j] === board[i][j+1] && board[i][j] === board[i][j+2]) {
				return true;
			}
			if (board[i][j] === board[i+1][j] && board[i][j] === board[i+2][j]) {
				return true;
			}
		}
	}
	return false;
}

// handle mouse click events
canvas.addEventListener('click', function(event) {
    let x = event.offsetX;
    let y = event.offsetY;
    let row = Math.floor(y / BLOCK_SIZE);
    let col = Math.floor(x / BLOCK_SIZE);
    if (row >= ROWS || col >= COLS) {
        return;
    }
    if (row > 0 && board[row][col] === board[row - 1][col]) {
        swapBlocks(row, col, row - 1, col);
        if (checkMatches()) {
            console.log('Match found!');
            // TODO: handle match
        } else {
            swapBlocks(row, col, row - 1, col);
        }
    } else if (row < ROWS - 1 && board[row][col] === board[row + 1][col]) {
        swapBlocks(row, col, row + 1, col);
        if (checkMatches()) {
            console.log('Match found!');
            // TODO: handle match
        }
    }
});