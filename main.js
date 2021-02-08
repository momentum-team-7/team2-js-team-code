const url = 'http://localhost:3000/movies'
const form = document.querySelector('#mainInput')
const movieName = document.querySelector('input')

// Event Listeners

fetch (url)
    .then (res => res.json ())
    .then (data => {
        console.log(data)
    })
