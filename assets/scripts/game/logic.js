'use strict'
   const player = require('./gameData.js')
   const gamePlay = require('./events.js')
   const ui = require('./ui')

   const setUp = function (gameData){
//default to x going first
      player.turn = 0
//on new game the board should be empty
      $('html .game-box').text('')
//initialize my 2d representation of the board
      player.boardState = new Array(3).fill('')
      for (let i = 0; i < 3; i++){
         player.boardState[i] = new Array(3)
      }
//initialize the array that checks for winner
      player.winner = new Array(8)
      for (let i = 0; i < 8; i++){
         player.winner[i] = new Array(2).fill(0)
      }
      player.gameId = gameData.game.id 
      $('.container').off('click', gamePlay.newGame)
   }

//check if someone won
const winnerWinner = () => {
//the inside findIndex checks to see if anyone has more than 3 in a magic square vector. The second one tells me in which row/column/diagonal the player actually won
   let weHaveAWinner = player.winner.findIndex(squareVectors => squareVectors.findIndex(playerValues => playerValues === 3) !== -1) 
   if (weHaveAWinner !== -1){
      $('.game-box').off('click', gamePlay.boxClicked)
      ui.onWinnerConfirmed(weHaveAWinner)
      return true
   }
}

//update the magic square set of vectors
   const winnerUpdate = function (boxCoords) { 
//figure out who just took a turn
      let whoseTurn = player.turn%2 === 0 ? 0 : 1;
      let x = boxCoords[0]
      let y = boxCoords[1]
      let boxSize = player.boxSize
//there are 8 unique row/column/diagonals in a square, so for each I store if player x (player.winner[vector][0]) or player o (player.winner[vector][1]) has played in that vector, and then how many times they've played there
      player.winner[x+1][whoseTurn]++
      player.winner[y+boxSize+2][whoseTurn]++
      if (x===y){
         player.winner[0][whoseTurn]++
      }
      if(x+y + 1 === player.boxSize){
         player.winner[boxSize+1][whoseTurn]++
      }
   }

module.exports = {
   setUp,
   winnerWinner,
   winnerUpdate
}
