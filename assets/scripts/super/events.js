'use strict'
   const superPlayer = require('./superData.js')
   const player = require('../game/gameData.js')
   const superUi = require('./ui.js')
   const gamePlay = require('../game/events.js')
   const superLogic = require('./logic.js')
   const api = require('../game/api.js')
   const ui = require('../game/ui.js')

   const instructionsClick = event => {
      event.preventDefault()
      player.message = $('#message').text()
      superUi.onInstructionsClick()
   }

   const superCancel = event => {
      event.preventDefault()
      superUi.onSuperCancel()
   }

   const superSmallZoom = event => {
      event.preventDefault()
      superUi.onSuperSmallZoom()
   }

   const superBigZoom = event => {
      event.preventDefault()
      superUi.onSuperBigZoom()
   }

   const returnToGame = event => {
      event.preventDefault()
      superUi.onZoomOut()
   }

   const returnToRegular = event => {
      event.preventDefault()
      superPlayer.message = $('#message').text()
      api.getIndex()
         .then(ui.onGetIndexSucceed)
         .catch(ui.onGetIndexFail)
      $('.new-game-super').off('submit', superNewGame)
      $('#new-game').on('submit', gamePlay.newGame)
      superUi.onReturnToRegular()
   }

//sets new game event handler for super tic tac toe and turns off regular new game event handler
const superContinue = event => {
   event.preventDefault()
   $('#total-games').text('No super tic-tac-toe stats.')
   $('#new-game').off('submit', gamePlay.newGame)
   $('.new-game-super').on('submit', superNewGame)
   superUi.onSuperContinue()
}

//split this up, move half to app file, rest into UI function
   const superNewGame = event => {
      event.preventDefault()
      superUi.onZoomOut()
      $('.super-box').on('click', firstBox)
      $('#super-bg-board .super-box').removeClass('bg-light')
      $('#super-bg-board .super-box .tiny-box').removeClass('oWin')
      $('#super-bg-board .super-box .tiny-box').removeClass('xWin')
      $('#super-bg-board .super-box').removeClass('winner-color')
//turn off the event handlers on each game-box when a new game is started (in case someone clicks new game without finishing a game)
      $('.super-reg-box').off('click', superBoxClicked)
      $('.super-reg-box').removeClass('winner-color')     
////start a game
      api.createGame()
      $('#message').removeClass()
      $('#message').addClass('success')
      $('#message').text("Player X begins. Please select a box to start in.")
      superLogic.superSetUp()
   }

   const firstBox = event => {
      event.preventDefault()
      $('.super-reg-box').on('click', superBoxClicked)
      superPlayer.lastPlay = $(event.currentTarget).data().coords
      $('.super-box').off('click', firstBox)
      superUi.onFirstBox()      
   }

   const superBoxClicked = function (event){
//gets the coordinates for a 2d array based on the data attribute of the game board divs, the map transforms the string to integer
      let newBoxCoords = $(event.target).data().coords.split(' ').map(str => +str)
//superPlayer.lastPlay points to the box the opponent JUST clicked on. This is very important, since all actions of current player depend on previous player
      let lastPlayedBox = superPlayer.lastPlay.split(' ').map(str=>+str)[1]*3 + superPlayer.lastPlay.split(' ').map(str=>+str)[0]
      let x = newBoxCoords[0]
      let y = newBoxCoords[1]
//if the clicked spot is empty, put an X or O in it depending on superPlayer.turn, update the winner array and game board, check if someone won, and if they didn't change superPlayer.turn
      if (!superPlayer.superBoardState[lastPlayedBox][x][y]){
         let whoseTurn = superPlayer.turn%2 === 0 ? 'X' : 'O';
         superPlayer.superBoardState[lastPlayedBox][x][y] = whoseTurn
//update the array that is used to check if someone won
         superLogic.superWinnerUpdate(superPlayer.superWinner[lastPlayedBox],newBoxCoords)
//update board with click
         superUi.onSuperPlayerClicked(event)
//actually check if someone won         
         if(superLogic.superWinnerWinner(superPlayer.superWinner[lastPlayedBox], lastPlayedBox)){ return }
//if not, continue playing
         whoseTurn = superPlayer.turn%2 !== 0 ? 'X' : 'O';
         $('#message').addClass('success')         
         $('#message').text(`It is player ${whoseTurn}\'s turn!`)
         superPlayer.turn++
         superPlayer.lastPlay = $(event.target).data().coords
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
   superSmallZoom,
   superBigZoom,
   superContinue,
   returnToGame,
   returnToRegular,
   superNewGame,
   firstBox,
   superBoxClicked
}

//just steal the api functions from the regular game

//don't need to make 9 api calls per game, since storing all subgames in regular array
//when entering super tic-tac-toe from regular, should check if game is in progress or needs to be started
//maybe a you are here thing for the white box
//     outline the box maybe using chris's link
//send game board arrays as the 9 elements of the api's game board? use stringify to convert to game board
//patch would have to send the entire game board