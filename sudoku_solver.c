#include <stdio.h>

#define N 9

int isSafe(int board[N][N], int row, int col, int num) {
    // Check if num is not in the row
    for (int i = 0; i < N; i++) {
        if (board[row][i] == num) {
            return 0;
        }
    }

    // Check if num is not in the column
    for (int i = 0; i < N; i++) {
        if (board[i][col] == num) {
            return 0;
        }
    }

    // Check if num is not in the 3x3 grid
    int startRow = row - row % 3;
    int startCol = col - col % 3;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] == num) {
                return 0;
            }
        }
    }

    return 1;
}

int solveSudoku(int board[N][N]) {
    for (int row = 0; row < N; row++) {
        for (int col = 0; col < N; col++) {
            if (board[row][col] == 0) {
                for (int num = 1; num <= N; num++) {
                    if (isSafe(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) {
                            return 1;
                        }
                        board[row][col] = 0; // backtrack
                    }
                }
                return 0; // No valid number found, backtrack
            }
        }
    }
    return 1; // Solved
}

void printBoard(int board[N][N]) {
    for (int row = 0; row < N; row++) {
        for (int col = 0; col < N; col++) {
            printf("%d ", board[row][col]);
        }
        printf("\n");
    }
}

int main() {
    int board[N][N] = {
        {5, 3, 0, 0, 7, 0, 0, 0, 0},
        {6, 0, 0, 1, 9, 5, 0, 0, 0},
        {0, 9, 8, 0, 0, 0, 0, 6, 0},
        {8, 0, 0, 0, 6, 0, 0, 0, 3},
        {4, 0, 0, 8, 0, 3, 0, 0, 1},
        {7, 0, 0, 0, 2, 0, 0, 0, 6},
        {0, 6, 0, 0, 0, 0, 2, 8, 0},
        {0, 0, 0, 4, 1, 9, 0, 0, 5},
        {0, 0, 0, 0, 8, 0, 0, 7, 9}
    };

    if (solveSudoku(board)) {
        printf("Solved Sudoku:\n");
        printBoard(board);
    } else {
        printf("No solution exists\n");
    }

    return 0;
}
