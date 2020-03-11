'use strict'
   const api = require('./api.js')
   const ui = require('./ui.js')
   const player = require('./gameData.js')
   const logic = require('./logic.js')

//click a box function
   const boxClicked = function (event){
//      let who = player.turn === 0 ? 'X' : 'O'; 
//      let pos = $(event.target).data().coords.split(' ')
//      pos = pos[1]*3 + +pos[0]
//      console.log(pos)

//the boardUpdate function handles updating the internal game board and also the API
      logic.boardUpdate(event)

//      let who;
//      if (player.turn === 0) {
//         who = 'X'
//         player.turn = 1
//      }
//      else {
//         who = 'O'
//         player.turn = 0
//      }
//      
//      $(event.target).text(who)
   }

   const newGame = function (event) {
      event.preventDefault()
      api.createGame()
         .then(logic.setUp)
         .catch(ui.onSetUpFail)
   }

module.exports = {
   boxClicked,
   newGame
}
