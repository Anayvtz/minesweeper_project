

// globals
export let board = [
    [0, 0, 0, 0, 0, 0, 1, 2, -1],
    [0, 0, 0, 0, 1, 1, 2, -1, 2],
    [0, 0, 0, 0, 1, -1, 2, 1, 1],
    [0, 1, 1, 1, 2, 2, 3, 1, 1],
    [0, 1, -1, 2, 2, -1, 2, -1, 1],
    [0, 1, 1, 2, -1, 2, 2, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 0, 0],
    [1, -1, 2, 1, 1, 1, 1, 1, 0],
    [1, 1, 2, -1, 1, 1, -1, 1, 0]
];

export let winningBoard = [
    [0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 1],
    [0, 0, 0, 0, 1, 0, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 0, 1, 1, 0, 1, 0, 1],
    [0, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 0, 0],
    [1, 0, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 0, 1, 1, 0, 1, 0]
]

// main
loadBoard();

// functions
function loadBoard() {
    let brd = document.querySelector(".board");
    board.forEach((row, index) => {
        row.forEach((col, ix) => {
            let cell = document.createElement("button");
            cell.classList.add(`row${index}`, `col${ix}`, "cell");
            brd.appendChild(cell);
        });
    })
}

function buildWinningBoard(bombCells) {
    let winCells = [];
    bombCells.forEach(bomb => {
        if (bomb[0] == 0 && bomb[1] == 0) {
            winCells.push([1, 0]);
            winCells.push([1, 1]);
            winCells.push([0, 1]);
        } else if (bomb[0] == 0 && bomb[1] == (winningBoard.length - 1)) {
            winCells.push([0, winningBoard.length - 2]);
            winCells.push([1, winningBoard.length - 2]);
            winCells.push([1, winningBoard.length - 1]);
        } else if (bomb[0] == (winningBoard.length - 1) && bomb[1] == 0) {
            winCells.push([winningBoard.length - 1, 1]);
            winCells.push([winningBoard.length - 2, 1]);
            winCells.push([winningBoard.length - 2, 0]);
        } else if (bomb[0] == (winningBoard.length - 1) && bomb[1] == (winningBoard.length - 1)) {
            winCells.push([winningBoard.length - 1, winningBoard.length - 2]);
            winCells.push([winningBoard.length - 2, winningBoard.length - 2]);
            winCells.push([winningBoard.length - 2, winningBoard.length - 1]);
        } else if (bomb[0] == 0) {
            winCells.push([0, bomb[1] - 1]);
            winCells.push([1, bomb[1] - 1]);
            winCells.push([1, bomb[1]]);
            winCells.push([1, bomb[1] + 1]);
            winCells.push([0, bomb[1] + 1]);
        } else if (bomb[1] == winningBoard.length - 1) {
            winCells.push([bomb[0] - 1, winningBoard.length - 1]);
            winCells.push([bomb[0] - 1, winningBoard.length - 2]);
            winCells.push([bomb[0], winningBoard.length - 2]);
            winCells.push([bomb[0] + 1, winningBoard.length - 2]);
            winCells.push([bomb[0] + 1, winningBoard.length - 1]);
        } else if (bomb[0] == winningBoard.length - 1) {
            winCells.push([winningBoard.length - 1, bomb[1] - 1]);
            winCells.push([winningBoard.length - 2, bomb[1] - 1]);
            winCells.push([winningBoard.length - 2, bomb[1]]);
            winCells.push([winningBoard.length - 2, bomb[1] + 1]);
            winCells.push([winningBoard.length - 1, bomb[1] + 1]);
        } else if (bomb[1] == 0) {
            winCells.push([bomb[0] - 1, 0]);
            winCells.push([bomb[0] - 1, 1]);
            winCells.push([bomb[0], 1]);
            winCells.push([bomb[0] + 1, 1]);
            winCells.push([bomb[0] + 1, 0]);
        } else {
            winCells.push([bomb[0] - 1, bomb[1] - 1]);
            winCells.push([bomb[0] - 1, bomb[1]]);
            winCells.push([bomb[0] - 1, bomb[1] + 1]);
            winCells.push([bomb[0], bomb[1] + 1]);
            winCells.push([bomb[0] + 1, bomb[1] + 1]);
            winCells.push([bomb[0] + 1, bomb[1]]);
            winCells.push([bomb[0] + 1, bomb[1] - 1]);
            winCells.push([bomb[0], bomb[1] - 1]);
        }
    });
    let winArr = winCells.filter(cell => !arrIncludesCell(bombCells, cell));
    let size = winningBoard.length;
    for (let i = 0; i < winningBoard.length; i++) {
        for (let j = 0; j < winningBoard[0].length; j++) {
            winningBoard[i][j] = 0;
        }
    }

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (arrIncludesCell(winArr, [i, j])) {
                winningBoard[i][j] = 1;
            } else {
                winningBoard[i][j] = 0;
            }
        }
    }
    console.log(winningBoard);
}
function arrIncludesCell(arr, cell) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] == cell[0] && arr[i][1] == cell[1]) {
            return true;
        }
    }
    return false;
}
function buildTemporaryBoard(bombCells) {
    let size = board.length;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            board[i][j] = 0;
        }
    }
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (arrIncludesCell(bombCells, [i, j])) {
                board[i][j] = -1;
            } else {
                board[i][j] = 0;
            }
        }
    }
}
function buildBoard(bombCells) {
    buildTemporaryBoard(bombCells);
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] == -1) {
                continue;
            }
            if (i == 0 && j == 0) {
                let count = 0;
                if (board[0][1] == -1) {
                    count++;
                }
                if (board[1][1] == -1) {
                    count++;
                }
                if (board[1][0] == -1) {
                    count++;
                }
                board[0][0] = count;
            }
            else if (i == 0 && j == board.length - 1) {
                let count = 0;
                if (board[0][board.length - 2] == -1) {
                    count++;
                }
                if (board[1][board.length - 2] == -1) {
                    count++;
                }
                if (board[1][board.length - 1] == -1) {
                    count++;
                }
                board[i][j] = count;
            }
            else if (i == board.length - 1 && j == board.length - 1) {
                let count = 0;
                if (board[board.length - 1][board.length - 2] == -1) {
                    count++;
                }
                if (board[board.length - 2][board.length - 2] == -1) {
                    count++;
                }
                if (board[board.length - 2][board.length - 1] == -1) {
                    count++;
                }
                board[i][j] = count;

            }
            else if (i == board.length - 1 && j == 0) {
                let count = 0;
                if (board[board.length - 1][1] == -1) {
                    count++;
                }
                if (board[board.length - 2][0] == -1) {
                    count++;
                }
                if (board[board.length - 2][1] == -1) {
                    count++;
                }
                board[i][j] = count;
            }
            else if (i == 0) {
                let count = 0;
                if (board[0][j - 1] == -1) {
                    count++;
                }
                if (board[1][j - 1] == -1) {
                    count++;
                }
                if (board[1][j] == -1) {
                    count++;
                }
                if (board[1][j + 1] == -1) {
                    count++;
                }
                if (board[0][j + 1] == -1) {
                    count++;
                }
                board[i][j] = count;
            }
            else if (j == board.length - 1) {
                let count = 0;
                if (board[i - 1][board.length - 1] == -1) {
                    count++;
                }
                if (board[i - 1][board.length - 2] == -1) {
                    count++;
                }
                if (board[i][board.length - 2] == -1) {
                    count++;
                }
                if (board[i + 1][board.length - 2] == -1) {
                    count++;
                }
                if (board[i + 1][board.length - 1] == -1) {
                    count++;
                }
                board[i][j] = count;
            }
            else if (i == board.length - 1) {
                let count = 0;
                if (board[board.length - 1][j - 1] == -1) {
                    count++;
                }
                if (board[board.length - 2][j - 1] == -1) {
                    count++;
                }
                if (board[board.length - 2][j] == -1) {
                    count++;
                }
                if (board[board.length - 2][j + 1] == -1) {
                    count++;
                }
                if (board[board.length - 1][j + 1] == -1) {
                    count++;
                }
                board[i][j] = count;
            }
            else if (j == 0) {
                let count = 0;
                if (board[i - 1][0] == -1) {
                    count++;
                }
                if (board[i - 1][1] == -1) {
                    count++;
                }
                if (board[i][1] == -1) {
                    count++;
                }
                if (board[i + 1][1] == -1) {
                    count++;
                }
                if (board[i + 1][0] == -1) {
                    count++;
                }
                board[i][j] = count;

            }
            else {
                let count = 0;
                if (board[i - 1][j - 1] == -1) {
                    count++;
                }
                if (board[i - 1][j] == -1) {
                    count++;
                }
                if (board[i - 1][j + 1] == -1) {
                    count++;
                }
                if (board[i][j + 1] == -1) {
                    count++;
                }
                if (board[i + 1][j + 1] == -1) {
                    count++;
                }
                if (board[i + 1][j] == -1) {
                    count++;
                }
                if (board[i + 1][j - 1] == -1) {
                    count++;
                }
                if (board[i][j - 1] == -1) {
                    count++;
                }
                board[i][j] = count;
            }
        }
    }
}

export function rebuildBoards() {
    // get the locations of the bombs
    let bombCells = [];
    while (bombCells.length < 10) {
        let row = Math.floor(Math.random() * board.length);
        let col = Math.floor(Math.random() * board.length);
        if (!bombCells.some(cell => cell[0] == row && cell[1] == col)) {
            bombCells.push([row, col]);
        }
    }

    // build the winningTable
    buildWinningBoard(bombCells);

    buildBoard(bombCells);
}