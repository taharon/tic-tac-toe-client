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

//called from the boardUpdate function in logic, which passes the string containing game state + whos played as well as the index to update on the api in who and pos, respectively
   const sendMove = (who, pos) => {
//      let who = player.turn === 0 ? 'X' : 'O'; 
//      let pos = $(event.target).data().coords.split(' ')
//      pos = pos[1]*3 + pos[0]
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
                     index: pos,
                     value: who
                  },
                  over: false
               }
            }
         }
      )

   }

module.exports = {
   createGame,
   sendMove
}
