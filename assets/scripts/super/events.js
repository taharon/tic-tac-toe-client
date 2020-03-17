'use strict'
   const player = require('../game/gameData.js')
   const ui = require('./ui.js')
   const gamePlay = require('../game/events.js')

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
//      $('.new-game-super').on('submit', newSuperGame)
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
//      $('.new-game-super').off('submit', newSuperGame)
      $('#new-game').on('submit', gamePlay.newGame)
      ui.onReturnToRegular()
   }

module.exports = {
   instructionsClick,
   superCancel,
   superContinue,
   superSmallZoom,
   superBigZoom,
   returnToGame,
   returnToRegular
}