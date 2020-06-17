'use strict'

let apiUrl
const apiUrls = {
  production: 'https://tranquil-sands-26303.herokuapp.com/',
  development: 'https://tic-tac-toe-wdi.herokuapp.com/'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

module.exports = {
  apiUrl
}
