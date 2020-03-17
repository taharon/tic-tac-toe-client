'use strict'
   const player = require('../game/gameData.js')
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
      $('#new-game').attr('id','new-game-super')
      $('#new-game-super').removeAttr('id','new-game')
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

   module.exports={
      onInstructionsClick,
      onSuperCancel,
      onSuperSmallZoom,
      onSuperBigZoom,
      onSuperContinue,
      onReturnToGame
   }