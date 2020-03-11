'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const store = require('./store.js')
if (!store.user){
   $('#change-pw').hide()
   $('#sign-out').hide()
}

if (store.user){
   $('#sign-up').hide()
   $('#sign-in').hide()
}
$(() => {
   const userCreate = require('./auth/events.js')
  // your JS code goes here
   $('#sign-up').on('submit', userCreate.onSignUp)
   $('#sign-in').on('submit', userCreate.onSignIn)
   $('#change-pw').on('submit', userCreate.onChangePw)
   $('#sign-out').on('submit', userCreate.onSignOut)
})
