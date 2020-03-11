'use strict'
   const player = require('./gameData.js')

   const onSetUpFail = () => {
      $('#message').text('Failed to set up a new game')
      $('#message').removeClass()
      $('#message').addClass('failure') 
   }

   const onSendMoveFail = () => {
      $('#message').text('Failed to send move')
      $('#message').removeClass()
      $('#message').addClass('failure') 
   }

//add the X or O to the board
   const onSendMoveSucceed = (event) => {
      if (player.turn === 0){
         $(event.target).text('X')
         player.turn = 1
      }
      else{
         $(event.target).text('O')
         player.turn = 0
      }
   }

module.exports = {
   onSetUpFail,
   onSendMoveFail,
   onSendMoveSucceed
}
