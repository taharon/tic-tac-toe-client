'use strict'
   const api = require('./api.js')
   const ui = require('./ui.js')
   const getFormFields = require('/Users/taharon/sei/projects/tic-tac-toe-client/lib/get-form-fields.js')

//log in function
   const onSignUp = function (event) {
      event.preventDefault()
      const data = getFormFields(event.target)
//checking to see that the user password = password_confirmation
      if (data.credentials.password !== data.credentials.password_confirmation){
         $('#message').text('Password does not match password confirmation!')
         $('#message').removeClass()
         $('#message').addClass('failure')
//resetting the page on any button click
         $('html form').trigger('reset')
         return
      }
      api.signUp(data)
         .then(ui.onSignUpSuccess)
         .catch(ui.onSignUpFail)
//resetting the page on any button click
      $('html form').trigger('reset')
   }
   
   const onSignIn = function (event) {
      event.preventDefault()
      api.signIn(getFormFields(event.target))
         .then(ui.onSignInSuccess)
         .catch(ui.onSignInFail)
      $('html form').trigger('reset')
   }
   
   const onChangePw = function (event) {
      event.preventDefault()
      api.changePw(getFormFields(event.target))
         .then(ui.onChangePwSuccess)
         .catch(ui.onChangePwFail)
      $('html form').trigger('reset')
   }

   const onSignOut = function (event) {
      event.preventDefault()
      api.signOut()
         .then(ui.onSignOutSuccess)
         .catch(ui.onSignOutFail)
      $('html form').trigger('reset')
   }
module.exports = {
   onSignUp,
   onSignIn,
   onSignOut,
   onChangePw
}

