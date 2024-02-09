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
let computerNum = 0;
playButton.disabled = true;
resetButton.disabled = true;
playButton.addEventListener("click", gameStart);
resetButton.addEventListener("click", gameReset);
gameStartBtn.addEventListener("click", function () {
  gameStartBtn.remove();
  playButton.disabled = false;
  resetButton.disabled = false;
  soundStart(backgroundAudio);
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
function gameStart() {
  let inputNum = input.value;
  console.log("입력한 숫자", inputNum);

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
    gameOverScreen.innerHTML = `<img src="${gameOverImage.src}" alt="" />`;
    result.textContent = "끝났어...탈락이야";
    result.style.color = "red";
    whatNum.style.color = "red";
    whatNum.textContent = computerNum;

    playButton.disabled = true;
    soundStart(gameOverAudio);
  }
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
}
