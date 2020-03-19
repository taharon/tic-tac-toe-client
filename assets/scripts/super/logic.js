'use strict'
   const superPlayer = require('./superData.js')
   const gamePlay = require('./events.js')
   const superUi = require('./ui')

   const superSetUp = function (){
//default to x going first
      superPlayer.turn = 0
      superUi.gameClear()
//initialize my 3d representation of the board (9 2d arrays, one for each board in the super grid)
      superPlayer.superBoardState = new Array(9).fill('')
      for (let i = 0; i < 9; i++){
         superPlayer.superBoardState[i] = new Array(3).fill('')
         for (let j = 0; j < 3; j++){
            superPlayer.superBoardState[i][j] = new Array(3)
         }
      }
//initialize the array that checks for winner in each mini board
      superPlayer.superWinner = new Array(9)
      for (let i = 0; i < 9; i++){
         superPlayer.superWinner[i] = new Array(8)
         for (let j = 0; j < 8; j++){
            superPlayer.superWinner[i][j] = new Array(2).fill(0)
         }
      }
//initialize the array that tracks the winner of the actual super game
      superPlayer.actualWinner = new Array(8)
      for (let i=0; i<8; i++){
         superPlayer.actualWinner[i] = new Array(2).fill(0)
      }
   }


//update the magic square set of vectors
const superWinnerUpdate = function (winArray, boxCoords) { 
   //figure out who just took a turn
      if(winArray !== 0){
         let whoseTurn = superPlayer.turn%2 === 0 ? 0 : 1;
         let x = boxCoords[0]
         let y = boxCoords[1]
         let boxSize = superPlayer.boxSize
   //has anyone won yet in this box?
         let finishedBox = winArray.findIndex(squareVectors => squareVectors.findIndex(playerValues => playerValues === 3) !== -1)
   //there are 8 unique row/column/diagonals in a square, so for each I store if player x (superPlayer.winner[vector][0]) or player o (superPlayer.winner[vector][1]) has played in that vector, and then how many times they've played there
         if (finishedBox === -1){
            winArray[x+1][whoseTurn]++
            winArray[y+boxSize+2][whoseTurn]++
            if (x===y){
               winArray[0][whoseTurn]++
            }
            if(x+y + 1 === superPlayer.boxSize){
               winArray[boxSize+1][whoseTurn]++
            }
         }
      }
   }

//checks if someone won on the small 3x3 board, marks it, and then if there is a win updates/checks on the large 3x3
const superWinnerWinner = (playArray, boxIndex) => {
//   console.log('playArray', playArray)
   if (playArray !== 0){
      let lastPlayedCoords = superPlayer.lastPlay.split(' ').map(str=>+str)
      let weHaveAWinner = playArray.findIndex(squareVectors => squareVectors[(superPlayer.turn)%2] === 3)
//did the player who just clicked win a square?
//      console.log('weHaveAWinner', weHaveAWinner)
      if (weHaveAWinner !== -1){
         superUi.onSuperWinnerConfirmed(boxIndex)
         superWinnerUpdate(superPlayer.actualWinner, lastPlayedCoords)
//         console.log('we have minor winner')
         superPlayer.superWinner[lastPlayedCoords[1]*3+lastPlayedCoords[0]] = 0
      }
      else{
//         console.log('no minor winner')
         return
      }
//also need to check if winner in the super box, then turn off click and do stuff when that winner is found
      let superWeHaveAWinner = superPlayer.actualWinner.findIndex(squareVectors => squareVectors[superPlayer.turn%2] === 3)
//      console.log('actual winner array', superPlayer.actualWinner)
      if(superWeHaveAWinner !== -1){
         superUi.onFullWinner(superWeHaveAWinner)
         $('.super-reg-box').off('click', gamePlay.superBoxClicked)
         return true
      }
      else{
         return
      }
   }
}

module.exports = {
   superSetUp,
   superWinnerWinner,
   superWinnerUpdate
}