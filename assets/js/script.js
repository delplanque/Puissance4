var gameContainer = document.getElementById("game");
var replay = document.getElementById('replay');
var gameStatus = [];
var currentPlayer = 0; // 1
var checkWinIndice = 0;
var isVictory = false;
var isIaPlayer = false;
var isIAGame = false;

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
  if(!isIaPlayer){
    var parrentID = event.target.parentNode.id;
    var id = parrentID.split("-")[1];
    playGame(id);
  } else {
    if(currentPlayer == 0 ) {
      var parrentID = event.target.parentNode.id;
      var id = parrentID.split("-")[1];
      playGame(id);
    }
    turnIa();
  }
}

function turnIa () {
  var win = false;
  var hasPlay = false;
  for (let id = 0; id < 7 && win == false; id++) {
    gameStatus[id].push(1);
    win = checkWinIA(getCoordonate(gameStatus, id), 1);
    if (!win) {
      gameStatus[id].pop();
    } else {
      hasPlay = true;
      displayResultIA(id, gameStatus[id]);
      if (checkWin(getCoordonate(gameStatus, id), 1) == true)
        winAlert(2);
    }
  }
  if (!hasPlay){
    for (let id = 0; id < 7 && win == false; id++) {
      gameStatus[id].push(0);
      win = checkWinIA(getCoordonate(gameStatus, id), 0);
      gameStatus[id].pop();
      if (win == true) {
        hasPlay = true;
        gameStatus[id].push(1);
        displayResultIA(id, gameStatus[id]);
      }
    }
  }
  if (!hasPlay) {
    while (!hasPlay) {
      var id = Math.floor(Math.random() * Math.floor(7));
      if (gameStatus[id].length < 7) {
        hasPlay = true;
        gameStatus[id].push(1);
        displayResultIA(id, gameStatus[id]);
      }
    }
  }
  changePlayer();
}

function playGame (id) {
  if (gameStatus[id].length < 6) {
    gameStatus[id].push(currentPlayer);
    displayResult(event, gameStatus[id]);
    if (checkWin(getCoordonate(gameStatus, id), currentPlayer) == true)
      winAlert(currentPlayer + 1);
    changePlayer();
  }
}

function displayResult(event, currentColum) {
  var y = event.target.parentNode;
  var ally = y.children;
  ally[6 - currentColum.length].classList.add("player" + (currentPlayer + 1));
}

function displayResultIA(id, currentColum) {
  var listCase = document.querySelectorAll(".rowPlay");
  listCase[id].children[6 - currentColum.length].classList.add("player" + 2);
}

function changePlayer() {
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  var player = document.getElementById('player');
  console.log(player)
  player.innerText = `Joueur ${currentPlayer + 1}, c'est votre tour`;
}

function getCoordonate(game, x) {
  return [parseInt(x), game[x].length - 1];
}

function checkWin([x, y], player) {
  // Horizontal
  let count = 0;
  for (let j = 0; j < 6; j++) {
    count = this.gameStatus[x][j] == player ? count + 1 : 0;
    if (count >= 4 && !isVictory) {
      return true;
    }
  }
  // Vertical
  count = 0;
  for (let i = 0; i < 7; i++) {
    count = this.gameStatus[i][y] == player ? count + 1 : 0;
    if (count >= 4 && !isVictory) {
      return true;
    }
  }
  // Diagonal
  count = 0;
  let shift = x - y;
  for (let i = Math.max(shift, 0); i <= Math.min(6, 7 + shift); i++) {
    count = this.gameStatus[i][i - shift] == player ? count + 1 : 0;
    if (count >= 4 && !isVictory) {
      return true;
    }
  }
  // Anti-diagonal
  count = 0;
  shift = x + y;
  for (let i = Math.max(shift - 7 + 1, 0); i < Math.min(6, shift + 1); i++) {
    count = this.gameStatus[i][shift - i] == player ? count + 1 : 0;
    if (count >= 4 && !isVictory) {
      return true;
    }
  }
}

function checkWinIA([x, y], player) {

  // Horizontal
  let count = 0;
  for (let j = 0; j < 6; j++) {
    count = this.gameStatus[x][j] == player ? count + 1 : 0;
    if (count >= 4 && !isVictory) {
        return true;
    }
  }
  // Vertical
  count = 0;
  for (let i = 0; i < 7; i++) {
    count = this.gameStatus[i][y] == player ? count + 1 : 0;
    if (count >= 4 && !isVictory) {
      return true;
    }
  }
  // Diagonal
  count = 0;
  let shift = x - y;
  for (let i = Math.max(shift, 0); i <= Math.min(6, 7 + shift); i++) {
    count = this.gameStatus[i][i - shift] == player ? count + 1 : 0;
    if (count >= 4 && !isVictory) {
      return true;
    }
  }
  // Anti-diagonal
  count = 0;
  shift = x + y;
  for (let i = Math.max(shift - 7 + 1, 0); i < Math.min(6, shift + 1); i++) {
    count = this.gameStatus[i][shift - i] == player ? count + 1 : 0;
    if (count >= 4 && !isVictory) {
      return true;
    }
  }
  return false;
}

function winAlert(player) {
  if (!isIaPlayer)
    alert('Le joueur ' + player + ' gagne');
  else {
    if (player == 1)
      alert('Vous avez gagné');
    else
      alert("L'IA a gagné, LOOSER");
  }
  isVictory = true;
}

// INIT GAME
initGame(0);

replay.addEventListener('click', event => {
  initGame(0);
});

ia.addEventListener('click', event => {
  isIAGame = true;
  isIaPlayer = true;
  initGame(0);
});

multi.addEventListener('click', event => {
  isIAGame = false;
  isIaPlayer = false;
  initGame(0);
});