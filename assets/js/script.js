var gameContainer = document.getElementById("game");
var gameStatus = [];
var currentPlayer = 0; // 1
var checkWinIndice = 0;
var isVictory = false;

function createGrid() {
  var grid = "";
  for (let i = 0; i < 7; i++) {
    grid += `
    <div class="rowPlay" id="col-${i}">
      <div class="case" data-case></div>
      <div class="case" data-case></div>
      <div class="case" data-case></div>
      <div class="case" data-case></div>
      <div class="case" data-case></div>
      <div class="case" data-case></div>
    </div>`;
  }

  gameContainer.innerHTML = grid;
}

function initGame(time) {
  setTimeout(() => {
    createGrid();
    isVictory = false;
    gameStatus = [[], [], [], [], [], [], []];

    var listCase = document.querySelectorAll("[data-case]");
    listCase.forEach(element => {
      element.addEventListener("click", event => {
        if (!isVictory) {
          play(event);
        }
      });
    });
  }, time);
}

function play(event) {
  var parrentID = event.target.parentNode.id;
  var id = parrentID.split("-")[1];

  if (gameStatus[id].length < 6) {
    gameStatus[id].push(currentPlayer);
    displayResult(event, gameStatus[id]);
    changePlayer();
  }
}

function displayResult(event, currentColum) {
  var y = event.target.parentNode;
  var ally = y.children;
  ally[6 - currentColum.length].classList.add("payer" + (currentPlayer + 1));
}

function changePlayer() {
  currentPlayer = currentPlayer === 0 ? 1 : 0;
}

initGame(0);
