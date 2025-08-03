let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let newGame = document.querySelector("#new");

let turnO = true; //Player X, Player O
let moveCount = 0;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

const showWinner = (winner) => {
    for (let box of boxes) {
        box.disabled = true;
    }
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
}

const drawGame = () => {
    msg.innerText = `Match is a Draw`;
    msgContainer.classList.remove("hide");
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                return showWinner(pos1Val);
            }
        }
    }
    // check for draw condition
    if (moveCount === 9) {
        drawGame();
    }
};

const resetGame = () => {
    turnO = true;
    moveCount = 0;
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "X";
            turnO = false;
            box.style.color = "green";
        }
        else {
            box.innerText = "O";
            turnO = true;
            box.style.color = "red";
        }
        box.disabled = true;
        moveCount++;
        checkWinner();
    });
});

newGame.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);