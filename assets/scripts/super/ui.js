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
      $('#message').removeClass()
      $('#message').addClass('success')
      $('#message').text('Please click New Game to begin.')
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

   //      let boxCoords = $(event.target).data().coords.split(' ').map(str => +str)

   const onSuperPlayerClicked = (event) => {
//clickedIndex calculates which box a player JUST clicked on, and converts it into an index 0-8
      let clickedIndex = $(event.target).data().coords.split(' ').map(str=>+str)[1]*3 + $(event.target).data().coords.split(' ').map(str=>+str)[0]
//current box coords provides the coordinates for the box that the previous player sent the current player to
      let currentBoxCoords = superPlayer.lastPlay.split(' ').map(str => +str)
      let x = currentBoxCoords[0]
      let y = currentBoxCoords[1]
      let currentX = $(event.target).data().coords.split(' ').map(str=>+str)[0]
      let currentY = $(event.target).data().coords.split(' ').map(str=>+str)[1]
//target is the tiny grid in the super box where I need to insert the last player's move
      let target = `#super-bg-board [data-coords=\"${currentX} ${currentY}\"]`
      $('#super-bg-board .super-box').removeClass('bg-light')
      $(target).addClass('bg-light')
      target = `#super-bg-board [data-coords=\"${x} ${y}\"]`
//nested jquery selector first finds the parent super box's children, grabbing the correct one with clickedIndex, then actually adds text to the right one
      if (superPlayer.turn%2 === 0){
         $($(target).find('.tiny-box')[clickedIndex]).text('X')
         $(event.target).text('O')
      }
      else{
         $($(target).find('.tiny-box')[clickedIndex]).text('O')
         $(event.target).text('O')
      }
//clear the board and load in the x's and o's for the board to which the player was just sent by their opponent
      $('html #super-sm-board .super-reg-box').text('')
      let tmpBoard = superPlayer.superBoardState[clickedIndex]
      for (let i = 0; i < 3; i++){
         for (let j = 0; j <3; j++){
            target = `#super-sm-board [data-coords=\"${i} ${j}\"]`
            $(target).text(tmpBoard[i][j])
         }
      }
   }

   const gameClear = () => {
      //on new game the board should be empty
      $('html #super-sm-board .super-reg-box').text('')
      $('html #super-bg-board .tiny-box').text('')
   }

   const onFirstBox = () => {
      let startCoords = superPlayer.lastPlay.split(' ').map(str => +str)
      let x = startCoords[0]
      let y = startCoords[1]
      if ((y===x)&&(y===1)){
         $('#message').removeClass()
         $('#message').text("X picked the middle box. It is X's turn to play.")
         return
      }
      let row
      let column
      switch(y){
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
      switch(x){
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
      $('#message').text(`X picked the ${row} ${column} box. It is X's turn to play.`)
   }

   const onSuperWinnerConfirmed = (boxIndex) =>{
      let whoseTurn = superPlayer.turn%2
//selects the box where we have a winner for color coding
      let boxToColor = $($('#super-bg-board').find('.super-box')[boxIndex])
      if(!$(boxToColor.find('.tiny-box')[0]).hasClass('xWin') && !$(boxToColor.find('.tiny-box')[0]).hasClass('oWin')){
         for (let i = 0; i < 9; i++){
            if (whoseTurn === 0){
               if (i%2===0){
                  $(boxToColor.find('.tiny-box')[i]).addClass('xWin')
               }
            }
            else{
               if (i!==4){
                  $(boxToColor.find('.tiny-box')[i]).addClass('oWin')
               }
            }
         }
      }
   }

   const onFullWinner = (whichArray) => {
      let whoseTurn = player.turn%2 === 0 ? 'X' : 'O';
      $('#message').removeClass()
      $('#message').addClass('success')
      $('#message').text(`Player ${whoseTurn} won!`)
      $('#super-bg-board .super-box').removeClass('bg-light')
//top left to bottom right diagonal
      if (whichArray === 0){
         for(let i = 0; i< player.boxSize; i++){
            let boxData = `[data-coords=\"${i} ${i}\"]`
            $(`#super-bg-board ${boxData}`).addClass('winner-color')
         }
      }
//bottom left to top right diagonal
      else if (whichArray === player.boxSize+1){
         for(let i = 0; i< player.boxSize; i++){
            let boxData = `[data-coords=\"${i} ${player.boxSize-i-1}\"]`
            $(`#super-bg-board ${boxData}`).addClass('winner-color')
         }
      }
//vertical win
      else if (whichArray < player.boxSize+1){
         for(let i = 0; i< player.boxSize; i++){
            let boxData = `[data-coords=\"${whichArray-1} ${i}\"]`
            $(`#super-bg-board ${boxData}`).addClass('winner-color')
         }
      }
//horizontal win
      else if (whichArray > player.boxSize+1){
         for(let i = 0; i< player.boxSize; i++){
            let boxData = `[data-coords=\"${i} ${whichArray-player.boxSize-2}\"]`
            $(`#super-bg-board ${boxData}`).addClass('winner-color')
         }
      }
      onSuperBigZoom()
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
      onFirstBox,
      gameClear,
      onSuperWinnerConfirmed,
      onFullWinner
   }