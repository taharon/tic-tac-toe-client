'use strict'
   const player = require('./gameData.js')
   const gamePlay = require('./events.js')
   const eventHandler = require('../app.js')

   const setUp = function (gameData){
//rest to x going first
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
      $('.box').addClass('game-box')
      $('.container').off('click', gamePlay.newGame)
      eventHandler.gameBox()
   }

//update the internal boardstate
   const boardUpdate = function(event){
//gets the coordinates for a 2d array based on the data atribute of the game board divs, the map transforms the string to integer
      let pos = $(event.target).data().coords.split(' ').map(str => +str)
      console.log(player.boardState)
      if (!player.boardState[pos[0]][pos[1]]){
//if the clicked spot is empty, put an X or O in it depending on player.turn and then change player.turn
         player.boardState[pos[0]][pos[1]] = player.turn === 0 ? 'X' : 'O';
         winnerUpdate(pos)
         console.log(player.winner)
         player.turn = player.turn === 0 ? 1 : 0;
      }
   }

   const winnerUpdate = function (pos) { 
//figure out who just took a turn
      let who = player.turn === 0 ? 0 : 1;
//increment the 8 parts of winner (magic square logic) based on the position the user just clicked
      player.winner[pos[0]+1][who]++
      player.winner[pos[1]+3+2][who]++
      if (pos[0]===pos[1]){
         player.winner[0][who]++
      }
      else if(pos[0]+pos[1] + 1 === 3){
         player.winner[3+1][who]++
      }
   }

module.exports = {
   setUp,
   boardUpdate
}
