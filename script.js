const N = 9;
let board = [];

// Function to generate the Sudoku grid dynamically
function generateBoard() {
    const table = document.getElementById("sudoku-board");
    for (let i = 0; i < N; i++) {
        const row = table.insertRow();
        board[i] = [];
        for (let j = 0; j < N; j++) {
            const cell = row.insertCell();
            const input = document.createElement("input");
            input.type = "number";
            input.min = 1;
            input.max = 9;
            input.value = "";
            input.id = `cell-${i}-${j}`;
            cell.appendChild(input);
            board[i][j] = 0; // Initialize with empty values
        }
    }
}

// Function to get the current board state from the input fields
function getBoard() {
    let currentBoard = [];
    for (let i = 0; i < N; i++) {
        currentBoard[i] = [];
        for (let j = 0; j < N; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            currentBoard[i][j] = cell.value ? parseInt(cell.value) : 0;
        }
    }
    return currentBoard;
}

// Function to update the board with the solution
function updateBoard(board) {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            cell.value = board[i][j];
        }
    }
}

// Function to check if it's safe to place a number in the current cell
function isSafe(board, row, col, num) {
    // Check row and column
    for (let i = 0; i < N; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false;
        }
    }

    // Check 3x3 grid
    let startRow = row - row % 3;
    let startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] === num) {
                return false;
            }
        }
    }
    return true;
}

// Function to solve the Sudoku puzzle using backtracking
function solveSudoku(board) {
    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= N; num++) {
                    if (isSafe(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) {
                            return true;
                        }
                        board[row][col] = 0; // Backtrack
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// Event listener for the Solve button
document.getElementById("solveBtn").addEventListener("click", function () {
    let board = getBoard();
    if (solveSudoku(board)) {
        updateBoard(board);
    } else {
        alert("No solution exists!");
    }
});

// Initialize the Sudoku board
generateBoard();
