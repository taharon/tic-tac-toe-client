'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const store = require('./store.js')
const gamePlay = require('./game/events.js')
const gameApi = require('./game/api.js')
const gameUi = require('./game/ui.js')
//if user doesn't currently exist, don't show change password or sign-out
if (!store.user){
   $('#change-pw').attr('hidden','hidden')
   $('#sign-out').attr('hidden','hidden')
   $('sign-in').removeAttr('hidden')
   $('sign-up').removeAttr('hidden')
}

//if user does currently exist, don't show sign-up or sign-in
if (store.user){
   $('#sign-up').attr('hidden','hidden')
   $('#sign-in').attr('hidden','hidden')
   $('change-pw').removeAttr('hidden')
   $('sign-out').removeAttr('hidden')
}

//when jquery loads
$(() => {
//importing authorization events
   const userCreate = require('./auth/events.js')
//actual event handlers for sign up, in, out, and PW change
   $('#sign-up').on('submit', userCreate.onSignUp)
   $('#sign-in').on('submit', userCreate.onSignIn)
   $('#change-pw').on('submit', userCreate.onChangePw)
   $('#sign-out').on('submit', userCreate.onSignOut)

   $('#new-game').on('submit', gamePlay.newGame)
})

const gameReady = () => {
   $('.game-box').on('click', gamePlay.boxClicked)
}

const startFromBoard = () => {
   $('#demo-board').on('click', gamePlay.newGame)
}

const showTotal = () => {
//   gameApi.getIndex()
//      .then(gameUi.onGetIndexSucceed)
//      .catch(gameUi.onGetIndexFail)
}

module.exports = {
   gameReady,
   startFromBoard,
   showTotal
}
console.log(module.exports)
