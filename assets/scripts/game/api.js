'use strict'
   const url = require('../config.js')
   const store = require('../store.js')
   const player = require('./gameData')

   const createGame = () => {
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

   const getIndex = () => {
      return $.ajax(
         {
            url: url.apiUrl + 'games',
            headers:{
               "Authorization": `Token token=${store.user.token}`
            },
            method: 'GET'
         }
      )
   }

//called from the boardUpdate function in logic, which passes the string containing game state + whos played as well as the index to update on the api in who and pos, respectively
   const sendMove = (xOrO, apiIndex) => {
      return $.ajax(
         {
            url: url.apiUrl + 'games/' + player.gameId,
            headers:{
               "Authorization": `Token token=${store.user.token}`
            },
            method: 'PATCH',
            data: {
               game: {
                  cell: {
                     index: apiIndex,
                     value: xOrO
                  },
                  over: false
               }
            }
         }
      )

   }

module.exports = {
   createGame,
   sendMove,
   getIndex
}
