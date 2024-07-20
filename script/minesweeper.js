
// imports
import { board, winningBoard, rebuildBoards } from "./board.js";
import { stopTimer, restartTimer } from "./timer.js";
import { insertToLocalStorage, loadFromStorage } from "./storage.js";

// globals
let playingTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

//main
console.log("board.length:" + board.length);
for (let i = 0; i < board.length; i++) {

    let rowItems = document.querySelectorAll(`.row${i}`);
    console.log("rowItems:" + rowItems + " i:" + i);

    rowItems.forEach((item, index) => {

        console.log(" coll index:" + index);

        item.addEventListener("click", () => {

            console.log("board[i][index]:" + board[i][index]);
            if (handleBombImg(board[i][index], item) == false) {
                item.innerHTML = board[i][index];
            } else {
                stopGame();
            }

            setPlayingTbl(i, index);
            if (checkWin()) {
                stopGame();
            }
        });
    })
}
document.querySelector(".restart-btn").addEventListener("click", restartGame);
document.querySelector(".storage").addEventListener("click", loadFromStorage);

// functions
function setPlayingTbl(rowIx, colIx) {
    playingTable[rowIx][colIx] = 1;
}

function handleBombImg(boardItem, btn) {
    if (boardItem != -1) return false;
    let img = document.createElement("img");
    img.src = "./images/icons8-bomb-48.png";
    img.alt = "bomb";
    img.style.display = "block";
    btn.appendChild(img);
    let status = document.getElementById("status");
    status.innerHTML = "Bomer! you lost";
    return true;
}
function checkWin() {
    for (let i = 0; i < playingTable.length; i++) {
        for (let j = 0; j < playingTable[0].length; j++) {
            if (playingTable[i][j] != winningBoard[i][j]) {
                return false;
            }
        }
    }

    let status = document.getElementById("status");
    status.innerHTML = " Congratulations, you win!";
    return true;
}


function stopGame() {
    let cells = document.querySelectorAll(".cell");
    cells.forEach(item => item.disabled = true);
    stopTimer();
    insertToLocalStorage();
}

function resetPlayingTable() {
    for (let i = 0; i < playingTable.length; i++) {
        for (let j = 0; j < playingTable[0].length; j++) {
            playingTable[i][j] = 0;
        }
    }
}
function restartGame() {
    resetPlayingTable();
    rebuildBoards();
    let cells = document.querySelectorAll(".cell");
    cells.forEach(item => {
        item.innerHTML = "";
        item.disabled = false;
    });
    let status = document.getElementById("status");
    status.innerHTML = "game status apperas here";
    restartTimer();
}