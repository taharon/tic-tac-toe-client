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

  // let boxData = `[data-coords=\"${i} ${player.boxSize-i-1}\"]`
   //$(boxData).addClass('winner-color')


   const onSuperPlayerClicked = (event) => {
      let newBoxCoords = $(event.target).data().coords.split(' ').map(str => +str)
      let x = newBoxCoords[0]
      let y = newBoxCoords[1]
      if (superPlayer.turn%2 === 0){
         $(event.target).text('X')
      }
      else{
         $(event.target).text('O')
      }
   }

   const onFirstBox = () => {
      let startCoords = superPlayer.lastPlay.split(' ').map(str => +str)
      let x = startCoords[0]
      let y = startCoords[1]
      if ((y===x)&&(y===1)){
         $('#message').removeClass()
         $('#message').text("X picked the middle box. It is X's turn to play")
         return
      }
      let row
      let column
      switch(x){
         case 0:
            row = 'top'
            break;
         case 1:
            row = 'middle'
            break;
         case 2:
            row = 'bottom'
            break;
      }
      switch(y){
         case 0:
            column = 'left'
            break;
         case 1:
            column = 'middle'
            break;
         case 2:
            column = 'right'
            break;
      }
      $('#message').removeClass()
      $('#message').text(`X picked the ${row} ${column} box. It is X's turn to play`)
   }

   module.exports={
      onInstructionsClick,
      onSuperCancel,
      onSuperSmallZoom,
      onSuperBigZoom,
      onSuperContinue,
      onReturnToGame,
      onReturnToRegular,
      onSuperPlayerClicked,
      onFirstBox
   }