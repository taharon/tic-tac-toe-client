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
//resetting the forms on any button click
         $('html form').trigger('reset')
         return
      }
      api.signUp(data)
         .then(ui.onSignUpSuccess)
         .catch(ui.onSignUpFail)
//resetting the forms on any button click
      $('html form').trigger('reset')
   }
   
//sign in function
   const onSignIn = function (event) {
      event.preventDefault()
      api.signIn(getFormFields(event.target))
         .then(ui.onSignInSuccess)
         .catch(ui.onSignInFail)
//resetting the forms on any button click
      $('html form').trigger('reset')
   }
   
//change password function
   const onChangePw = function (event) {
      event.preventDefault()
      let passObj = {}
      passObj.passwords = {}
      passObj.passwords.old = document.getElementById("old-pw").value
      passObj.passwords.new = $('#new-pw').val()
      api.changePw(passObj)
         .then(ui.onChangePwSuccess)
         .catch(ui.onChangePwFail)
//resetting the forms on any button click
      $('html form').trigger('reset')
   }

//sign out function
   const onSignOut = function (event) {
      event.preventDefault()
      api.signOut()
         .then(ui.onSignOutSuccess)
         .catch(ui.onSignOutFail)
//resetting the forms on any button click
      $('html form').trigger('reset')
   }

   const onPassChange = function (event) {
      event.preventDefault()
      $('.pass-logout').attr('hidden', 'hidden')
      $('#change-pw').removeAttr('hidden')
   }

module.exports = {
   onSignUp,
   onSignIn,
   onSignOut,
   onChangePw,
   onPassChange
}

