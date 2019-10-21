const cards = document.querySelector('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
	if (lockBoard) return;
	if ( this === firstCard) return;
	this.classlist.add('flip')

	if (!hasFlippedCard){
		hasFlippedCard = true;
		firstCard = this;

		return;
	} 


		hasFlippedCard = false; 
		secondCard = this;
		checkForMatch();
}

function checkForMatch() {
	let isMatch = firstCard.dataset.framework ===
	secondCard.dataset.framework;

	isMatch ? disableCards() : unflipCards();



function disableCards(){
	firstCard.removeEventlistner('click', flipCard);
	secondCard.removeEventlistner('click',flipCard);

	resetBoard ();
}		


function  unflipCards() {
	lockBoard = true;
}
  setTimeout(() =>{ 
  	firstCard.classlist.remove ('flip');
	secondCard.classlist.remove('flip');

	resetBoard();
		  }, 1500); 
	}			

function resetBoard() {
	[asFlippedCard, lockBoard] = [false,false];
	[firstCard, secondCard] = [null, null];
}

function shuffle() {
	card.forEach ( card => {
		let randomPos = Math.floor (Math.random() * 12);
		card.style.order = randomPos;
	})
}

cards.forEach(card => card.addEventlistener){
	console.log('click',flipCard);
	};