let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");

let currentPlayer = "X";
let board = Array(9).fill("");

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            highlightWinner(pattern);
            disableAllBoxes();
            setTimeout(() => alert(`${board[a]} wins!`), 100);
            return;
        }
    }

    if (!board.includes("")) {
        setTimeout(() => alert("It's a draw!"), 100);
    }
}

function highlightWinner(pattern) {
    pattern.forEach(index => {
        boxes[index].style.backgroundColor = "#c8e6c9"; // light green
    });
}

function disableAllBoxes() {
    boxes.forEach(box => box.disabled = true);
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (!box.textContent && !box.disabled) {
            box.textContent = currentPlayer;
            board[index] = currentPlayer;
            checkWinner();
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    });
});

resetBtn.addEventListener("click", () => {
    board.fill("");
    boxes.forEach(box => {
        box.textContent = "";
        box.disabled = false;
        box.style.backgroundColor = "#fff";
    });
    currentPlayer = "X";
});