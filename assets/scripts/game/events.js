'use strict'
   const api = require('./api.js')
   const ui = require('./ui.js')
   const player = require('./gameData.js')
   const store = require('../store.js')
   const logic = require('./logic.js')

//click a box function
   const boxClicked = function (event){
      let who;
      if (player.turn === 0) {
         who = 'X'
         player.turn = 1
      }
      else {
         who = 'O'
         player.turn = 0
      }
      
      $(event.target).text(who)
   }

   const newGame = function (event) {
      event.preventDefault()
      api.createGame()
         .then(logic.setUp)
         .catch(ui.onSetUpFail)
      console.log(player.boardState, player.winner, player.gameId)
   }

module.exports = {
   boxClicked,
   newGame
}
