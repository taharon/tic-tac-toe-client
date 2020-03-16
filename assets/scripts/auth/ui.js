'use strict'
//removeAttr('hidden') and attr('hidden','hidden') are used in this page to show or hide html elements depending on a user's login status
const store = require('../store.js')
    
const onSignUpSuccess = () => {
  $('#message').text('Signed up successfully')
  $('#message').removeClass()
  $('#message').addClass('success') 
}

const onSignUpFail = error => {
  $('#message').text('Failed to sign up')
  $('#message').removeClass()
  $('#message').addClass('failure') 
}
const onSignInSuccess = (data) => {
  $('#message').text('Signed in successfully')
  $('#message').removeClass()
  $('#message').addClass('success')
//after a login, save the user data so the token can be retrieved
  store.user = data.user
  $('#sign-out').removeAttr('hidden')
  $('#sign-up').attr('hidden','hidden')
  $('#sign-in').attr('hidden','hidden')
  const gamePlay = require('../game/events.js')
  $('#demo-board').on('click', gamePlay.newGame)
  const gameApi = require('../game/api.js')
  const gameUi = require('../game/ui.js')
  gameApi.getIndex()
     .then(gameUi.onGetIndexSucceed)
     .catch(gameUi.onGetIndexFail)
  $('#new-game').removeAttr('hidden')
  $('.hide-user').removeAttr('hidden')
  $('.pass-logout').removeAttr('hidden')
  $('.username').text(store.user.email)
}

const onSignInFail = error => {
  $('#message').text('Failed to sign in')
  $('#message').removeClass()
  $('#message').addClass('failure')
  $('#change-pw').attr('hidden','hidden')
  $('#sign-out').attr('hidden','hidden')
}

const onSignOutSuccess = () => {
  $('#message').text('Signed out successfully')
  $('#message').removeClass()
  $('#message').addClass('success')
  $('#change-pw').attr('hidden','hidden')
  $('#sign-out').attr('hidden','hidden')
  $('#sign-up').removeAttr('hidden')
  $('#sign-in').removeAttr('hidden')
  $('#total-games').attr('hidden','hidden')
  $('#new-game').attr('hidden','hidden')
  $('#game-board').attr('hidden','hidden')
  $('#demo-board').removeAttr('hidden')
  $('.hide-user').attr('hidden', 'hidden')
  $('.pass-logout').attr('hidden', 'hidden')
}

const onSignOutFail = () => {
  $('#message').text('Failed to sign out')
  $('#message').removeClass()
  $('#message').addClass('failure')
}

const onChangePwSuccess = (data) => {
  const api = require('./api.js')
  $('#message').text('Password changed successfully')
  $('#message').removeClass()
  $('#message').addClass('success')
  $('#change-pw').attr('hidden','hidden')
  $('#sign-out').attr('hidden','hidden')
  $('#sign-up').removeAttr('hidden')
  $('#sign-in').removeAttr('hidden')
  $('.hide-user').attr('hidden', 'hidden')
  api.signOut()
}

const onChangePwFail = error => {
  $('#message').text('Failed to change password')
  $('#message').removeClass()
  $('#message').addClass('failure')
}

module.exports = {
   onSignUpFail,
   onSignUpSuccess,
   onSignInFail,
   onSignInSuccess,
   onSignOutFail,
   onSignOutSuccess,
   onChangePwFail,
   onChangePwSuccess
}
