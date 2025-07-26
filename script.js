const boxes = document.querySelectorAll(".box");
const gameInfo = document.getElementById("gameInfo");
const newGameBtn = document.getElementById("newGameBtn");
const playerInput = document.getElementById("playerInput");
const gameContainer = document.getElementById("gameContainer");
const startBtn = document.getElementById("start-game");

let playerX = "";
let playerO = "";
let currentPlayer = "X";
let gameGrid = ["", "", "", "", "", "", "", "", ""];
let isGameActive = false;

const winCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

startBtn.addEventListener("click", () => {
  const nameX = document.getElementById("playerX").value.trim();
  const nameO = document.getElementById("playerO").value.trim();

  if (!nameX || !nameO) {
    alert("Please enter both player names!");
    return;
  }

  playerX = nameX;
  playerO = nameO;
  playerInput.style.display = "none";
  gameContainer.style.display = "flex";
  isGameActive = true;
  currentPlayer = "X";
  gameInfo.innerText = `${playerX}'s Turn (X)`;
});

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    const index = box.dataset.index;

    if (!isGameActive || gameGrid[index] !== "") return;

    box.innerText = currentPlayer;
    gameGrid[index] = currentPlayer;

    checkWin();
    if (isGameActive) switchTurn();
  });
});

function switchTurn() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  const currentName = currentPlayer === "X" ? playerX : playerO;
  gameInfo.innerText = `${currentName}'s Turn (${currentPlayer})`;
}

function checkWin() {
  for (let combo of winCombos) {
    const [a, b, c] = combo;
    if (
      gameGrid[a] &&
      gameGrid[a] === gameGrid[b] &&
      gameGrid[a] === gameGrid[c]
    ) {
      boxes[a].classList.add("win");
      boxes[b].classList.add("win");
      boxes[c].classList.add("win");

      isGameActive = false;
      const winner = gameGrid[a] === "X" ? playerX : playerO;
      gameInfo.innerText = `${winner} Wins! 🎉`;
      newGameBtn.classList.add("active");
      return;
    }
  }

  if (!gameGrid.includes("")) {
    gameInfo.innerText = "It's a Draw!";
    isGameActive = false;
    newGameBtn.classList.add("active");
  }
}

newGameBtn.addEventListener("click", () => {
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach(box => {
    box.innerText = "";
    box.classList.remove("win");
  });
  currentPlayer = "X";
  isGameActive = true;
  gameInfo.innerText = `${playerX}'s Turn (X)`;
  newGameBtn.classList.remove("active");
});
