'use strict'
   const onSetUpFail = () => {
      $('#message').text('Failed to set up a new game')
      $('#message').removeClass()
      $('#message').addClass('failure') 
   }

module.exports = {
   onSetUpFail
}
