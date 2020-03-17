'use strict'
   const player = require('../game/gameData.js')
   const superPlayer = require('./superData.js')
   let messageText

   const onInstructionsClick = () => {
      messageText = $('#message').text()
      $('#reg-game').attr('hidden','hidden')
      $('#super-inst').removeAttr('hidden')
      $('#message').removeClass()
      $('#message').text('Welcome to Super Tic-Tac-Toe')
   }

   const onSuperCancel = () =>{
      $('#reg-game').removeAttr('hidden')
      $('#super-inst').attr('hidden','hidden')
      $('#message').text(messageText)
   }

   const onSuperSmallZoom = () =>{
      $('#super-bg-board').attr('hidden','hidden')
      $('#super-sm-board').removeClass('col-4')
      $('#super-sm-board').addClass('col-12')
      $('#super-zoom').attr('hidden','hidden')
      $('#super-return').removeAttr('hidden')
   }

   const onSuperContinue = () => {
      $('#super-inst').attr('hidden','hidden')
      $('#super-game').removeAttr('hidden','hidden')
   }

   const onSuperBigZoom = () =>{
      $('#super-sm-board').attr('hidden','hidden')
      $('#super-bg-board').removeClass('col-7')
      $('#super-bg-board').addClass('col-12')
      $('#super-zoom').attr('hidden','hidden')
      $('#super-return').removeAttr('hidden')    
   }

   const onReturnToGame = () => {
      $('#super-bg-board').removeAttr('hidden')
      $('#super-sm-board').removeAttr('hidden')
      $('#super-bg-board').removeClass('col-12')
      $('#super-bg-board').addClass('col-7')
      $('#super-sm-board').removeClass('col-12')
      $('#super-sm-board').addClass('col-4')
      $('#super-zoom').removeAttr('hidden')
      $('#super-return').attr('hidden','hidden')  
   }

   const onReturnToRegular = () => {
      if (player.winner.length) {
         $('#super-game').attr('hidden','hidden')
         $('#reg-game').removeAttr('hidden')
         let who = player.turn%2===0 ? 'X' : 'O'
         $('#message').removeClass()
         $('#message').addClass('success')
         $('#message').text(`Welcome back to your game. It is player ${who}'s turn.`)
      }
      else{
         $('#super-game').attr('hidden','hidden')
         $('#reg-game').removeAttr('hidden')
         $('#message').removeClass()
         $('#message').addClass('success')
         $('#message').text('Please click New Game to begin.')
      }
   }

   module.exports={
      onInstructionsClick,
      onSuperCancel,
      onSuperSmallZoom,
      onSuperBigZoom,
      onSuperContinue,
      onReturnToGame,
      onReturnToRegular
   }