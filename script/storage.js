
export function insertToLocalStorage() {
    let timer = document.getElementById("timer");
    console.log("timer:" + timer);
    let storage = JSON.parse(localStorage.getItem("minesweeper")) || [];
    console.log("timerDisplay:" + timer.value);
    storage.push(timer.value);
    console.log("storage:" + storage);
    localStorage.setItem("minesweeper", JSON.stringify(storage));
}

export function loadFromStorage() {
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