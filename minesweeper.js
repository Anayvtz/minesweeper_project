
// imports
import { board, winningBoard } from "./board.js";
import { stopTimer, restartTimer } from "./timer.js";

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
]
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
    return true;
}
function checkWin() {
    playingTable.forEach((row, index) => {
        row.forEach((cell, ix) => {
            if (cell != winningBoard[index][ix]) {
                return false;
            }
        });
    });
}

function insertToLocalStorage() {
    let timer = document.getElementById("timer");
    console.log("timer:" + timer);
    let storage = JSON.parse(localStorage.getItem("minesweeper")) || [];
    console.log("timerDisplay:" + timer.value);
    storage.push(timer.value);
    console.log("storage:" + storage);
    localStorage.setItem("minesweeper", JSON.stringify(storage));
}

function loadFromStorage() {
    let storage = JSON.parse(localStorage.getItem("minesweeper")) || [];
    if (storage.length == 0) {
        console.log("nothing in storage for minesweeper");
        alert("nothing in storage for minesweeper");
        return;
    }
    let tableHTML = '<table border="1"><thead><tr><th>Game duration</th></thead><tbody>';
    storage.forEach(item => {

        tableHTML += `<tr><td>${item}</td></tr>`;
    });
    tableHTML += '</tbody></table>';

    let newWindow = window.open('', '_blank', 'location=yes,toolbar=yes,directories=yes,status=yes,menubar=yes,scrollbar=yes');
    newWindow.document.open();
    newWindow.document.write(`
        <html>
        <head>
        <title>table of winnings</title>
        <style>
        body {
        display:flex;
        justify-content: center;
        align-items: center;
        height:100vh;
        margin:0;
        font-family:arial;
        }
        table {
        border-collapse:collapse;
        width:80%;
        max-width:800px;
        text-align: center;
        }
        th,td {
        padding:10px;
        border: 1px solid navy;
        }
        th {
        background-color: lightskyblue;
        }
        </style>
        </head>
        <body>
        ${tableHTML}
        </body>
        </html>`);
    newWindow.document.close();
}
function stopGame() {
    let cells = document.querySelectorAll(".cell");
    cells.forEach(item => item.disabled = true);
    stopTimer();
    insertToLocalStorage();
}
function restartGame() {
    let cells = document.querySelectorAll(".cell");
    cells.forEach(item => {
        item.innerHTML = "";
        item.disabled = false;
    });
    restartTimer();
}