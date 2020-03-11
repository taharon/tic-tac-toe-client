'use strict'
const url = require('../config.js')
const store = require('../store.js')
//HTTP requests for user authentication
const signUp = (userData) => {
   return $.ajax(
   {
      url: url.apiUrl + 'sign-up',
      method: 'POST',
      data: userData
   }
)
}

const signIn = (userData) => {
   return $.ajax(
   {  
      url: url.apiUrl + 'sign-in',
      method: 'POST',
      data: userData
   }
)  
}     
      
const changePw = (userData) => {
   return $.ajax(
   {
      url: url.apiUrl + 'change-password',
      headers:{
         "Authorization": `Token token=${store.user.token}`
      },
      method: 'PATCH',
      data: userData
   }
)
}

const signOut = () => {
   return $.ajax(
   {
      url: url.apiUrl + 'sign-out',
      headers:{
         "Authorization": `Token token=${store.user.token}`
      },
      method: 'DELETE',
   }
)
}

module.exports = {
   signUp,
   signIn,
   signOut,
   changePw
}
