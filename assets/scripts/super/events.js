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
       $('#new-game').attr('id','new-game-super')
       $('#new-game-super').removeAttr('id','new-game')
       $('#super-inst').attr('hidden','hidden')
       $('#super-game').removeAttr('hidden','hidden')
       
   }

module.exports = {
   instructionsClick,
   superCancel,
   superContinue
}