'use strict'
   const player = require('./superData.js')
   const ui = require('./ui.js')
   const gamePlay = require('../game/events.js')
   const logic = require('./logic.js')

   const instructionsClick = event => {
      event.preventDefault()
      ui.onInstructionsClick()
   }

   const superCancel = event => {
      event.preventDefault()
      ui.onSuperCancel()
   }

   const superContinue = event => {
      event.preventDefault()
      $('#new-game').off('submit', gamePlay.newGame)
      $('.new-game-super').on('submit', newSuperGame)
      ui.onSuperContinue()
   }

   const superSmallZoom = event => {
      event.preventDefault()
      ui.onSuperSmallZoom()
   }

   const superBigZoom = event => {
      event.preventDefault()
      ui.onSuperBigZoom()
   }

   const returnToGame = event => {
      event.preventDefault()
      ui.onReturnToGame()
   }

   const returnToRegular = event => {
      event.preventDefault()
      $('.new-game-super').off('submit', newSuperGame)
      $('#new-game').on('submit', gamePlay.newGame)
      ui.onReturnToRegular()
   }

   const newSuperGame = event => {
//turn off the event handlers on each game-box when a new game is started (in case someone clicks new game without finishing a game)
      $('.super-reg-box').off('click', superBoxClicked)
      $('.super-reg-box').removeClass('winner-color')     
//start a game
      $('#message').removeClass()
      $('#message').addClass('success')
      $('#message').text("It is X's turn!")
      logic.superSetUp()
      $('.super-reg-box').on('click', superBoxClicked)
   }

   const superBoxClicked = function (event){
//gets the coordinates for a 2d array based on the data attribute of the game board divs, the map transforms the string to integer
      let newBoxCoords = $(event.target).data().coords.split(' ').map(str => +str)
      let currentBoxIndex = player.lastPlay.split(' ').map(str=>+str)[1]*3 + player.lastPlay.split(' ').map(str=>+str)[0]
      let x = newBoxCoords[0]
      let y = newBoxCoords[1]
//if the clicked spot is empty, put an X or O in it depending on player.turn, update the winner array and game board, check if someone won, and if they didn't change player.turn
      if (!player.superBoardState[currentBoxIndex][x][y]){
         let whoseTurn = player.turn%2 === 0 ? 'X' : 'O';
         player.superBoardState[currentBoxIndex][x][y] = whoseTurn
//did someone win?
         logic.superWinnerUpdate(boxCoords)
         ui.onSuperPlayerClicked(event)
         hoseTurn = player.turn%2 !== 0 ? 'X' : 'O';
         $('#message').addClass('success')         
         $('#message').text(`It is ${whoseTurn}\'s turn!`)
         if(logic.superWinnerWinner()){ return }
//if not, continue playing
         player.turn++
         player.lastPlay = $(event.target).data().coords
      }
      else{
         $('#message').removeClass()
         $('#message').addClass('failure')
         $('#message').text("Can't go there!")
      }
   }

module.exports = {
   instructionsClick,
   superCancel,
   superContinue,
   superSmallZoom,
   superBigZoom,
   returnToGame,
   returnToRegular,
   newSuperGame
}