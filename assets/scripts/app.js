'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const store = require('./store.js')
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
$(() => {
//importing authorization events
   const userCreate = require('./auth/events.js')
//actual event handlers for sign up, in, out, and PW change
   $('#sign-up').on('submit', userCreate.onSignUp)
   $('#sign-in').on('submit', userCreate.onSignIn)
   $('#change-pw').on('submit', userCreate.onChangePw)
   $('#sign-out').on('submit', userCreate.onSignOut)
})
