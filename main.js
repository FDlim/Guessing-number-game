let gameOverImage = new Image();
gameOverImage.src = "./image/game-over-screen.gif";
console.log(gameOverImage.src);
let playButton = document.getElementById("play-button");
let resetButton = document.getElementById("reset-button");
let chance = 5;
let beforeInputNum = 0;
let result = document.getElementById("result");
let whatNum = document.getElementById("what-num");
let gameOverAudio = new Audio("./audio/game-over.mp3");
let backgroundAudio = new Audio("./audio/background-sound.mp3");
let gameOverScreen = document.getElementById("game-over-screen");
// let backgroundAudio = new Audio("./audio/background-sound.mp3");
let input = document.getElementById("input-num");
let gameStartBtn = document.getElementById("game-start");
let buttonContent = document.getElementById("button-content");
let chancesLeft = document.getElementById("chance");
let computerNum = 0;
function bloodOpacity(chance) {
  let blood = document.getElementById("blood");
  blood.style.opacity = 1 / chance;
  chance == 5 ? (blood.style.opacity = 0) : "";
}

playButton.disabled = true;
resetButton.disabled = true;
input.disabled = true;
playButton.addEventListener("click", gameStart);
input.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    gameStart();
    console.log("엔터 눌러짐");
    input.value = "";
  }
});
resetButton.addEventListener("click", gameReset);
gameStartBtn.addEventListener("click", function () {
  gameStartBtn.remove();
  input.disabled = false;
  playButton.disabled = false;
  resetButton.disabled = false;
  soundStart(backgroundAudio);
  chanceView();
  chancesLeft.style.opacity = 1;
});
input.addEventListener("click", function () {
  input.value = "";
});
function soundStart(file) {
  file.load();
  file.volume = 1;
  file.play();
}

// soundStart(backgroundAudio);

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log("정답은", computerNum);
}
pickRandomNum();

function chanceView() {
  chancesLeft.innerHTML = `남은기회 ${chance}회`;
}

function gameStart() {
  let inputNum = input.value;
  console.log("입력한 숫자", inputNum);
  let upCount = false;
  let downCount = false;
  let chanceCss = document.getElementById("chance");

  if (inputNum == undefined) {
    console.log("숫자를 입력해 주세요");
    result.textContent = "숫자를....입력...해..";
  } else if (inputNum > 100 || inputNum <= 0) {
    console.log("1부터..100...까지..");
    result.textContent = "1부터..100...까지..";
  } else if (inputNum == beforeInputNum) {
    console.log("이미 입력한 숫자입니다.");
    result.textContent = "이미..입력한..숫자는..안돼...";
    return;
  } else if (inputNum < computerNum) {
    console.log("UP!!");
    chance--;
    console.log(chance);
    result.textContent = "올라가.....";
  } else if (inputNum > computerNum) {
    console.log("Down!!");
    chance--;
    console.log(chance);
    result.textContent = "내려가.....";
  } else if (inputNum == computerNum) {
    console.log("정답입니다!!!");
    playButton.disabled = true;
    result.textContent = "...정답이야..운이좋네";
  }
  beforeInputNum = inputNum;
  if (chance == 0) {
    gameOverScreen.className = "game-over";
    result.textContent = "끝났어...탈락이야";
    result.style.color = "red";
    whatNum.style.color = "red";
    whatNum.textContent = computerNum;

    playButton.disabled = true;
    soundStart(gameOverAudio);
  }
  chanceView();

  chance == 1 ? (chancesLeft.style.color = "red") : "";
  bloodOpacity(chance);
}

function gameReset() {
  pickRandomNum();
  playButton.disabled = false;
  chance = 5;
  beforeInputNum = 0;
  result.textContent = "이번에는 맞출수 있겠지....?";
  whatNum.textContent = "??";
  input.value = "";
  result.style.color = "black";
  whatNum.style.color = "black";
  gameOverScreen.innerHTML = "";
  chancesLeft.style.color = "black";
  chanceView();
  bloodOpacity(chance);
}
