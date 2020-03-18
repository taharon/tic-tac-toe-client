'use strict'
   const superPlayer = require('./superData.js')
   const gamePlay = require('./events.js')
   const ui = require('./ui')

   const superSetUp = function (){
//default to x going first
      superPlayer.turn = 0
//on new game the board should be empty
      $('html #super-sm-board .super-reg-box').text('')
      $('html #super-bg-board .tiny-box').text('')
//initialize my 3d representation of the board (9 2d arrays, one for each board in the super grid)
      superPlayer.superBoardState = new Array(9).fill('')
      for (let i = 0; i < 9; i++){
         superPlayer.superBoardState[i] = new Array(3).fill('')
         for (let j = 0; j < 3; j++){
            superPlayer.superBoardState[i][j] = new Array(3)
         }
      }
      console.log(superPlayer.superBoardState)
//initialize the array that checks for winner in each mini board
      superPlayer.superWinner = new Array(9)
      for (let i = 0; i < 9; i++){
         superPlayer.superWinner[i] = new Array(8)
         for (let j = 0; j < 2; j++){
            superPlayer.superWinner[i][j] = new Array(2).fill(0)
         }
      }
//initialize the array that tracks the winner of the actual super game
      superPlayer.actualWinner = new Array(8)
      for (let i=0; i<8; i++){
         superPlayer.actualWinner[i] = new Array(2).fill(0)
      }
   }

module.exports = {
   superSetUp
}