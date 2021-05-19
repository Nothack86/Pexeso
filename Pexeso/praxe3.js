const cards = document.querySelectorAll('.memory-card');
const telicko = document.getElementById("body");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;
let hotovo = -10;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  document.getElementById("flipmp3").play();

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.jmeno === secondCard.dataset.jmeno;
  if (!isMatch) {
    document.getElementById("failmp3").play();
  }

  isMatch ? blokujkartu() : unflipCards();
  isMatch ? (score = score + 2) : (score = score - 1)
  /* if ale jinak napsanej*/
  if (isMatch) {
    document.body.style.background = "black url('pog.gif') ";
    hotovo++
  }
  console.log(score);
  if (hotovo == 0) {
    setTimeout(hotovocheck(), 2000)
  }
}

function hotovocheck() {
  alert("Tvé score je " + score + ".");
  location.reload();
}

function blokujkartu() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  document.getElementById("pogmp3").play();
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
  document.body.style.background = "black url('drevo.jpg')";
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
