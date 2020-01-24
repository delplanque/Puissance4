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
  }, time);
}

initGame(0);
