"use strict";
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const buttonNew = document.querySelector(".btn--new");
const rollNew = document.querySelector(".btn--roll");
const holdNew = document.querySelector(".btn--hold");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

let scores, currentScore, activePlayer;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer ? 0 : 1;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

const winner = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--winner");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");
  diceEl.classList.add("hidden");
  rollNew.disabled = true;
  holdNew.disabled = true;
};
rollNew.addEventListener("click", function () {
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.classList.remove("hidden");
  diceEl.src = `dice-${dice}.png`;

  if (dice !== 1) {
    currentScore += dice;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;

    if (currentScore >= 20) {
      winner();
    }
  } else {
    switchPlayer();
  }
});

holdNew.addEventListener("click", function () {
  scores[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];

  if (scores[activePlayer] >= 20) {
    winner();
  } else {
    switchPlayer();
  }
});

buttonNew.addEventListener("click", init);
