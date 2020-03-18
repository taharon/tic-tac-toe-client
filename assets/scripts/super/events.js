'use strict'
   const superPlayer = require('./superData.js')
   const superUi = require('./ui.js')
   const gamePlay = require('../game/events.js')
   const logic = require('./logic.js')

   const instructionsClick = event => {
      event.preventDefault()
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
      superUi.onReturnToGame()
   }

   const returnToRegular = event => {
      event.preventDefault()
      $('.new-game-super').off('submit', superNewGame)
      $('#new-game').on('submit', gamePlay.newGame)
      superUi.onReturnToRegular()
   }

//sets new game event handler for super tic tac toe and turns off regular new game event handler
const superContinue = event => {
   event.preventDefault()
   $('#new-game').off('submit', gamePlay.newGame)
   $('.new-game-super').on('submit', superNewGame)
   superUi.onSuperContinue()
}

//split this up, move half to app file, rest into UI function
   const superNewGame = event => {
      event.preventDefault()
      $('.super-box').on('click', firstBox)
//turn off the event handlers on each game-box when a new game is started (in case someone clicks new game without finishing a game)
      $('.super-reg-box').off('click', superBoxClicked)
      $('.super-reg-box').removeClass('winner-color')     
////start a game
      $('#message').removeClass()
      $('#message').addClass('success')
      $('#message').text("It is X's turn! Please select a box to start in.")
      logic.superSetUp()
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
//did someone win?
//         logic.superWinnerUpdate(newBoxCoords)
         superUi.onSuperPlayerClicked(event)
         whoseTurn = superPlayer.turn%2 !== 0 ? 'X' : 'O';
         $('#message').addClass('success')         
         $('#message').text(`It is ${whoseTurn}\'s turn!`)
 //        if(logic.superWinnerWinner()){ return }
//if not, continue playing
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


//When winning a game on reg tic tac toe then going to super, can't return after zooming.
//when returning to a game from super tic tac toe, if the regular game was won and then I left super, it'll currently return
//     and make the player think the game is still going