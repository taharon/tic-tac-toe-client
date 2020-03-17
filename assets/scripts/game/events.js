'use strict'
   const api = require('./api.js')
   const ui = require('./ui.js')
   const player = require('./gameData.js')
   const logic = require('./logic.js')

   const newGame = function (event) {
      event.preventDefault()
//turn off the event handlers on each game-box when a new game is started (in case someone clicks new game without finishing a game)
      $('.game-box').off('click', boxClicked)
      $('.game-box').removeClass('winner-color')
//remove the demo game board
      $('#demo-board').attr('hidden','hidden')
      $('#game-board').removeAttr('hidden')
//start a game
      $('#message').removeClass()
      $('#message').addClass('success')
      $('#message').text("It is X's turn!")
      api.createGame()
         .then(logic.setUp)
         .catch(ui.onSetUpFail)
      $('.game-box').on('click', boxClicked)
      api.getIndex()
         .then(ui.onGetIndexSucceed)
         .catch(ui.onGetIndexFail)
   }

//click a box function
   const boxClicked = function (event){
//gets the coordinates for a 2d array based on the data attribute of the game board divs, the map transforms the string to integer
      let boxCoords = $(event.target).data().coords.split(' ').map(str => +str)
      let x = boxCoords[0]
      let y = boxCoords[1]
//if the clicked spot is empty, put an X or O in it depending on player.turn, update the winner array and game board, check if someone won, and if they didn't change player.turn
      if (!player.boardState[x][y]){
         let whoseTurn = player.turn%2 === 0 ? 'X' : 'O';
         player.boardState[x][y] = whoseTurn
//did someone win?
         logic.winnerUpdate(boxCoords)
         ui.onPlayerClicked(event)
         api.sendMove(whoseTurn, (y*3+x))
         whoseTurn = player.turn%2 !== 0 ? 'X' : 'O';
         $('#message').addClass('success')         
         $('#message').text(`It is ${whoseTurn}\'s turn!`)
         if(logic.winnerWinner()){ return }
//if not, change player turn
         player.turn++
         if (player.turn === 9){
            $('.game-box').off('click', boxClicked)
            $('#message').removeClass()
            $('#message').addClass('failure')
            $('#message').text("It's a draw!")
            return
         }
      }
      else {
         $('#message').removeClass()
         $('#message').addClass('failure')
         $('#message').text("Can't go there!")
      }
   }

module.exports = {
   boxClicked,
   newGame
}
