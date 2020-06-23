'use strict';

let card = document.querySelectorAll('.card');
let cards = [...card];
const board = document.querySelector('#cards__wrapper');
let openedCards = [];
let matchedCard = [];
let moves = 0;
let second = '';
let timer = document.querySelector('.timer');
let modal = document.querySelector('#modal');
let button = document.querySelector('.button');

document.body.onload = startGame();

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function startGame() {
    openedCards = [];
    timer.innerHTML = '01:00';
    cards = shuffle(cards);
    for (let i = 0; i < cards.length; i++){
        board.innerHTML = '';
        [].forEach.call(cards, function(item) {
            board.appendChild(item);
        });
        cards[i].classList.remove('open','match','unmatched','disabled');
    }
    moves = 0;
    matchedCard = [];
}

for (let i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener('click', displayCard);
    card.addEventListener('click', cardOpen);
}

function displayCard() {
	if(openedCards.length < 2) {
		this.classList.add('open');
	} else {
		openedCards.forEach(openedCards => openedCards.classList.remove('unmatched', 'open'));
		openedCards = [];
		this.classList.add('open');
	}
 }

function cardOpen() {
    openedCards.push(this);
    if(openedCards.length === 1) {moveCounter();}
    if(openedCards.length === 2) {
		if(openedCards[0].type === openedCards[1].type && 
			openedCards[0] !== openedCards[1]) {
			matched();
        } else {
            unmatched();
        }
    }
};

function matched() {
	openedCards.forEach(openedCards => openedCards.classList.add('match', 'disabled'));
    openedCards = [];
    matchedCard.push(this);
    showModal();
}

function unmatched() {
	openedCards.forEach(openedCards => openedCards.classList.add('unmatched'));
}

function moveCounter() {
    moves++;
    if(moves == 1) {
        second = 59;
        startTimer();
    }
}

let interval;
function startTimer(){
    interval = setInterval(() => {
        (second > 9) ? timer.innerHTML = '00:'+second : timer.innerHTML = '00:0'+second;
        second--;
        if(second === -1) {
            showModal();
            clearInterval(interval);
        }
    },1000);
}

function showModal() {
    let button__inner = document.querySelector('.button__inner');
    if (matchedCard.length === 6){
        modal.classList.add('show__modal');
        clearInterval(interval);
        animation(['W','i','n']);
        button__inner.innerHTML = 'Play again';
    } else if (second === -1) {
        modal.classList.add('show__modal');
        animation(['L','o','s','e']);
        button__inner.innerHTML = 'Try again';
    }
    button.addEventListener('click', restart);
}

function animation(lettersArr) {
    for (let letter of lettersArr) {
        let newLetter = document.createElement('span');
        newLetter.classList.add('result__letters');
        newLetter.innerText = letter;
        newLetter.style.animationDelay = `${lettersArr.indexOf(letter) / 5}s`
        document.querySelector('.result').appendChild(newLetter);
    }
}

function restart() {
    modal.classList.remove('show__modal');
    startGame();
}