let player = document.getElementById("player");
let timerDisplay = document.getElementById("timer");
let timeLeft = 30;
let climbHeight = 0;
let climbing = false;
let playerName = "";

//Ask for players name
window.onload = () => {
  playerName = prompt ("Enter your name to play: ");
  if (!playerName) playerName = "Anonymous";
};

// Smooth climb animation
function climb() {
  if (climbHeight >= 340) return winGame();
  climbing = true;
  climbHeight += 5;
  player.style.bottom = `${climbHeight}px`;
  requestAnimationFrame(() => climbing = false);
}

// Touch support
document.addEventListener("touchstart", () => {
  if (!climbing) climb();
});

// Timer
let timer = setInterval(() => {
  timeLeft--;
  timerDisplay.textContent = `Time: ${timeLeft}`;
  if (timeLeft <= 0) {
    clearInterval(timer);
    alert("Time's up! Try again.");
  }
}, 1000);

// Win condition
function winGame() {
  clearInterval(timer);
  fetch("prize.php")
    .then(res => res.json())
    .then(prize => {
      alert(`🎉 You won: ${prize}!`);
      submitScore(prize);
    });
document.getElementById("cheer").play();
}

function submitScore(prize) {
  fetch("submit_score.php", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ player: playerName, time: 30 - timeLeft, prize })
  }).then(res => res.text()).then(msg => console.log(msg));
}
