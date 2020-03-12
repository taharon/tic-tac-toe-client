'use strict'
//removeAttr('hidden') and attr('hidden','hidden') are used in this page to show or hide html elements depending on a user's login status
const store = require('../store.js')
const gameAvailable = require('../app.js')
    
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
  $('#change-pw').removeAttr('hidden')
  $('#sign-out').removeAttr('hidden')
  $('#sign-up').attr('hidden','hidden')
  $('#sign-in').attr('hidden','hidden')
  gameAvailable.startFromBoard()
  gameAvailable.showTotal()
  $('#new-game').removeAttr('hidden')
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
