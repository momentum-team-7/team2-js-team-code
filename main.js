/* globals moment = require("moment") */
const url = 'http://localhost:3000/movies'
const form = document.querySelector('#mainInput')
let allMovieContainer = document.querySelector('.allMovies')

// Event Listeners
form.addEventListener ('submit', function(e) {
    e.preventDefault()
    addMovie()
})
function listAllMovies() {
    fetch (url)
        .then(res => res.json())
        .then(data => {
            console.log(data[0].title)
            renderMovie(data[0].title, data[0].watched, data[0].created_at)
            
        })
}

function addMovie() {
    
    let today = new Date();
    let movieTitle = document.querySelector('input').value
    let watched = false;


    fetch (url,  { 
        method: 'POST',
        headers: { 'Content-Type':'application/json'},
        body: JSON.stringify ({
            title: movieTitle,
        watched: watched,
        created_at: today 
        })
        .then (res => res.json ())
        .then (data => {
            console.log(data)
        })
    })
}

function renderMovie(title, watched, date){
    let movieDiv = document.createElement('div')
    let movieEl = document.createElement('p')
    let movieWatched = document.createElement('p')
    let movieDate = document.createElement('p')
    movieEl.innerHTML = title
    movieWatched.innerHTML = watched
    movieDate.innerHTML = date


    movieDiv.appendChild(movieEl)
    movieDiv.appendChild(movieWatched)
    movieDiv.appendChild(movieDate)

    allMovieContainer.appendChild(movieDiv)
}

listAllMovies()

















































