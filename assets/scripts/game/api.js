'use strict'
const url = require('../config.js')
const store = require('../store.js')

const createGame = () => {
//on new game the board should be empty
   return $.ajax(
      {
         url: url.apiUrl + 'games',
         headers:{
            "Authorization": `Token token=${store.user.token}`,
            "Content-Type": "application/json"
         },
         method: 'POST',
         data: {}
      }
   )
}

module.exports = {
   createGame
}
