'use strict'
   const player = require('./gameData.js')
   const setUp = function (gameData){
      player.turn = 0
      $('html .game-box').text('')
      player.boardState = new Array(3)
      for (let i = 0; i < 3; i++){
         player.boardState[i] = new Array(3)
      }
      player.winner = new Array(8)
      for (let i = 0; i < 8; i++){
         player.winner[i] = new Array(2)
      }
      player.gameId = gameData.game.id 
   }

module.exports = {
   setUp
}
