'use strict'
   const player = require('./gameData.js')

   const onGetIndexSucceed = (indexData) => {
      const totalGames = `Total games played: ${indexData.games.length}`
      $('#total-games').text(totalGames)
   }
   
   const onGetIndexFail = () => {
      $('#message').text("Couldn't get total played games")
      $('#message').removeClass()
      $('#message').addClass('failure') 
   }

   const onSetUpFail = () => {
      $('#message').text('Failed to set up a new game')
      $('#message').removeClass()
      $('#message').addClass('failure') 
   }

   const onSendMoveFail = () => {
      $('#message').text('Failed to send move')
      $('#message').removeClass()
      $('#message').addClass('failure') 
   }

//add the X or O to the board
   const onPlayerClicked = (event) => {
      if (player.turn%2 === 0){
         $(event.target).text('X')
      }
      else{
         $(event.target).text('O')
      }
   }
   
   const onWinnerConfirmed = (whichArray) => {
      let whoseTurn = player.turn%2 === 0 ? 'X' : 'O';
      $('#message').text(`Player ${whoseTurn} won!`)
//top left to bottom right diagonal
      if (whichArray === 0){
         for(let i = 0; i< player.boxSize; i++){
            let boxData = `[data-coords=\"${i} ${i}\"]`
            $(`#reg-game ${boxData}`).addClass('winner-color')
         }
      }
//bottom left to top right diagonal
      else if (whichArray === player.boxSize+1){
         for(let i = 0; i< player.boxSize; i++){
            let boxData = `[data-coords=\"${i} ${player.boxSize-i-1}\"]`
            $(`#reg-game ${boxData}`).addClass('winner-color')
         }
      }
//vertical win
      else if (whichArray < player.boxSize+1){
         for(let i = 0; i< player.boxSize; i++){
            let boxData = `[data-coords=\"${whichArray-1} ${i}\"]`
            $(`#reg-game ${boxData}`).addClass('winner-color')
         }
      }
//horizontal win
      else if (whichArray > player.boxSize+1){
         for(let i = 0; i< player.boxSize; i++){
            let boxData = `[data-coords=\"${i} ${whichArray-player.boxSize-2}\"]`
            $(`#reg-game ${boxData}`).addClass('winner-color')
         }
      }
   }

module.exports = {
   onGetIndexSucceed,
   onGetIndexFail,
   onSetUpFail,
   onSendMoveFail,
   onWinnerConfirmed,
   onPlayerClicked
}
