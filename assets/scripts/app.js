'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const store = require('./store.js')
const gamePlay = require('./game/events.js')
const superGamePlay = require('./super/events.js')
const userCreate = require('./auth/events.js')
const superGame = require('./super/events.js')
const superUi = require('./super/ui.js')
//if user doesn't currently exist, don't show change password or sign-out
if (!store.user){
   $('#change-pw').attr('hidden','hidden')
   $('#sign-out').attr('hidden','hidden')
   $('#sign-in').removeAttr('hidden')
   $('#sign-up').removeAttr('hidden')
}

//if user does currently exist, don't show sign-up or sign-in
if (store.user){
   $('#sign-up').attr('hidden','hidden')
   $('#sign-in').attr('hidden','hidden')
   $('#change-pw').removeAttr('hidden')
   $('#sign-out').removeAttr('hidden')
}

const problem = (event) => {
   event.preventDefault();
   $('#message').text("This doesn't do anything... Yet!")
}

//when jquery loads
$(() => {
//importing authorization events
//actual event handlers for sign up, in, out, and PW change
   $('#sign-up').on('submit', userCreate.onSignUp)
   $('#sign-in').on('submit', userCreate.onSignIn)
   $('#change-pw-button').on('click', userCreate.onChangePw)
   $('#sign-out').on('click', userCreate.onSignOut)
   $('#cancel-pw').on('click', userCreate.onPassCancel)
   $('#pass-change-show').on('click', userCreate.onPassChange)
   $('#new-game').on('submit', gamePlay.newGame)
   $('#cancel-change-pw').on('click', userCreate.onPassCancel)
//super tic-tac-toe
   $('#super-start').on('click', superGame.instructionsClick)
   $('#super-cancel').on('click',superGame.superCancel)
   $('#super-cont').on('click', superGame.superContinue)
   $('#super-sm-zoom').on('click', superGame.superSmallZoom)
   $('#super-bg-zoom').on('click', superGame.superBigZoom)
   $('#super-return').on('click', superGame.returnToGame)
   $('#return-reg').on('click', superGame.returnToRegular)

})
