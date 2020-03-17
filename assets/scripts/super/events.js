'use strict'
   const player = require('../game/gameData.js')
   const ui = require('./ui.js')

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

module.exports = {
   instructionsClick,
   superCancel,
   superContinue,
   superSmallZoom,
   superBigZoom,
   returnToGame
}