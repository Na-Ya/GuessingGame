function generateWinningNumber(){
    let min = Math.ceil(1);
    let max = Math.floor(100);
    let returnVal = Math.floor(Math.random() * (max-min +1) + 1);
    if (returnVal === 0){
        return 1;
    }
    return returnVal;
}

function shuffle(arr){
    let length = arr.length;
    let currentElem;
    let remainingElements; 
        while (length){
            remainingElements = Math.floor(Math.random() * length--);
            currentElem = arr[length];
            arr[length] = arr[remainingElements];
            arr[remainingElements] = currentElem;
        }
    return arr;
}

function Game(){
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function(){
    return Math.abs(this.winningNumber - this.playersGuess);
}

Game.prototype.isLower = function(){
    if (this.playersGuess < this.winningNumber){
        return true;
    } else {
        return false;
    }
}
Game.prototype.playersGuessSubmission = function(guess){
    if (guess>=1 && guess <=100){
        this.playersGuess = guess
    } else {
        throw "That is an invalid guess.";
    }
   return this.checkGuess();
}
Game.prototype.checkGuess = function(){
    if (this.playersGuess === this.winningNumber){
        return "You Win!"
    } else if (this.pastGuesses.includes(this.playersGuess)){
        return "You have already guessed that number.";
    } else if (this.pastGuesses.length ===4){
        return "You Lose.";
    } else {
        this.pastGuesses.push(this.playersGuess);
    }
    
    if (this.difference()<10){
        return "You're burning up!";
    } else if (this.difference()<25){
        return "You're lukewarm.";
    } else if (this.difference()<50){
        return "You're a bit chilly.";
    } else if (this.difference()<100){
        return "You're ice cold!";
    }
}

function newGame(){
    return new Game();
}

Game.prototype.provideHint = function(){
    let hintArr = [];
    hintArr.push(this.winningNumber, generateWinningNumber(), generateWinningNumber());
    return shuffle(hintArr);
}
