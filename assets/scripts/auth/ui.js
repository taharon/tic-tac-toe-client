'use strict'
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
  store.user = data.user
  $('#change-pw').show()
  $('#sign-out').show()
  $('#sign-up').hide()
  $('#sign-in').hide()
//  $('body').css('background-color', '#FC6A03')
}

const onSignInFail = error => {
  $('#message').text('Failed to sign in')
  $('#message').removeClass()
  $('#message').addClass('failure')
  $('#change-pw').hide()
  $('#sign-out').hide()
}

const onSignOutSuccess = () => {
  $('#message').text('Signed out successfully')
  $('#message').removeClass()
  $('#message').addClass('success')
  $('#change-pw').hide()
  $('#sign-out').hide()
  $('#sign-up').show()
  $('#sign-in').show()
//  $('body').css('background-color', '#FC6A03')
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
  $('#change-pw').hide()
  $('#sign-out').hide()
  $('#sign-up').show()
  $('#sign-in').show()
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
