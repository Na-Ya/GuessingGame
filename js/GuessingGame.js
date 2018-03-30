function generateWinningNumber() {
	let min = Math.ceil(1);
	let max = Math.floor(100);
	let returnVal = Math.floor(Math.random() * (max - min + 1) + 1);
	if (returnVal === 0) {
		return 1;
	}
	return returnVal;
}

function shuffle(arr) {
	let length = arr.length;
	let currentElem;
	let remainingElements;
	while (length) {
		remainingElements = Math.floor(Math.random() * length--);
		currentElem = arr[length];
		arr[length] = arr[remainingElements];
		arr[remainingElements] = currentElem;
	}
	return arr;
}

function Game() {
	this.playersGuess = null;
	this.pastGuesses = [];
	this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function() {
	return Math.abs(this.winningNumber - this.playersGuess);
};

Game.prototype.isLower = function() {
	if (this.playersGuess < this.winningNumber) {
		return true;
	} else {
		return false;
	}
};
Game.prototype.playersGuessSubmission = function(guess) {
	if (guess >= 1 && guess <= 100) {
		this.playersGuess = guess;
	} else {
		throw 'That is an invalid guess.';
	}
	return this.checkGuess();
};
Game.prototype.checkGuess = function() {
	if (this.playersGuess === this.winningNumber) {
		$('#subtitle').text('Press the Reset button to play again!');
		$('#hint, #submit').prop('disabled', true);
		return 'You Win!';
	} else if (this.pastGuesses.includes(this.playersGuess)) {
		return 'You have already guessed that number.';
	} else if (this.pastGuesses.length === 5) {
		$('#subtitle').text('Press the Reset button to play again!');
		$('#hint, #submit').prop('disabled', true);
		return 'You Lose.';
	} else {
		this.pastGuesses.push(this.playersGuess);
		$('#guessList li:nth-child(' + this.pastGuesses.length + ')').text(
			this.playersGuess
		);
	}
	if (this.isLower()) {
		$('#subtitle').text('Guess Higher!');
	} else {
		$('#subtitle').text('Guess Lower!');
	}

	if (this.difference() < 10) {
		$('body').css('background', 'linear-gradient(to left, #E83A00 , #720E07)');
		return "You're burning up!";
	} else if (this.difference() < 25) {
		$('body').css('background', 'linear-gradient(to right, #F18701 , #FF3F00)');
		return "You're lukewarm.";
	} else if (this.difference() < 50) {
		$('body').css('background', 'linear-gradient(to right, #B0D8F0 , #46A5DD)');
		return "You're a bit chilly.";
	} else if (this.difference() < 100) {
		$('body').css('background', 'linear-gradient(to left, #46A5DD , #1E2EDE)');
		return "You're ice cold!";
	}
};

function newGame() {
	return new Game();
}

Game.prototype.provideHint = function() {
	let hintArr = [];
	hintArr.push(
		this.winningNumber,
		generateWinningNumber(),
		generateWinningNumber()
	);
	return shuffle(hintArr);
};

$(document).ready(function() {
	let currentGame = newGame();

	//helper function for making guesses.
	function makeGuess(game) {
		let currentInput = $('#player-input').val();
		$('#player-input').val('');
		let currentOutput = game.playersGuessSubmission(Number(currentInput));
		$('#title').text(currentOutput);
	}

	//setting up click event for submit button
	$('#submit').click(function(val) {
		val.preventDefault();
		makeGuess(currentGame);
	});
	//setting up 'enter' key press event for player input
	$('#player-input').keypress(function(key) {
		if (key.which === 13) {
			makeGuess(currentGame);
		}
	});
	$('#reset').click(function(val) {
		val.preventDefault();
		currentGame = newGame();
		$('#title').text('Play the Guessing Game!');
		$('#subtitle').text('Guess a number between 1-100.');
		$('#hint, #submit').prop('disabled', false);
		$('.guess').text('_');
		$('body').css('background', 'linear-gradient(to right, #e6af4b, #e05038)');
	});
	$('#hint').click(function(val) {
		val.preventDefault();
		let hintArr = currentGame.provideHint();
		$('#title').text(
			`The winning number is one of the following: ${hintArr[0]}, ${
				hintArr[1]
			}, or ${hintArr[2]}!`
		);
	});
});
