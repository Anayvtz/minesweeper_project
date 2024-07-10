

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
/* export let winningBoard = [
    [6, 7],
    [4, 5, 6, 8],
    [4, 6, 7, 8],
    [1, 2, 3, 4, 5, 6, 7, 8],
    [1, 3, 4, 6, 8],
    [1, 2, 3, 5, 6, 7, 8],
    [0, 1, 2, 3, 4, 5],
    [0, 2, 3, 4, 5, 6, 7],
    [0, 1, 2, 4, 5, 7]
] */

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