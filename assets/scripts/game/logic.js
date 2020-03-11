'use strict'
   const logic = require('./gameData.js')
   const setUp = function (gameData){
      player.turn = 0
      $('html .game-box').text('')
      logic.boardState = new Array(3)
      for (let i = 0; i < 3; i++){
         logic.boardState[i] = new Array(3)
      }
      logic.winner = new Array(8)
      for (let i = 0; i < 8; i++){
         logic.winner[i] = new Array(2)
      }
      logic.gameId = gameData.game.id 
   }
