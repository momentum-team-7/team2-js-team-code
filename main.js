/* globals moment = require("moment") */
const url = 'http://localhost:3000/movies/'
const form = document.querySelector('#mainInput')
let allMovieContainer = document.querySelector('.allMovies')
let movies = document.querySelectorAll('.movie')

// Event Listeners
form.addEventListener('submit', function (e) {
    e.preventDefault()
    addMovie()
})

document.addEventListener('click', e => {
    let finishedMovieDate = document.createElement('p')
    finishedMovieDate.className = "movie-watched-date"
    if (e.target.className === "movie-watched") {

        if (e.target.innerHTML !== 'Watched') {
            e.target.innerHTML = "Watched"
            let date = moment().format("MMM Do YY")
            finishedMovieDate.innerHTML = date
            e.target.parentElement.appendChild(finishedMovieDate)
            editWatched(e.target, date)
        } else {
            let date = moment().format("MMM Do YY")
            e.target.innerHTML = 'Not Watched'
            editWatched(e.target, date)
            let dateDiv = document.querySelector(".movie-watched-date")
            dateDiv.remove()
        }

    } else if (e.target.className === "delete-button") {
        deleteMovie(e.target)

    }

})

// for (let movie of movies) {
//     movie.addEventListener('click', e => {
//         console.log('movie clicked') 
//     })

// }

function listAllMovies() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data[0].title)
            for (let movie of data) {
                renderMovie(movie)
            }
        })
}

function addMovie() {

    let today = new Date();
    let movieTitle = document.querySelector('input').value
    let watched_at = null;


    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: movieTitle,
            watched_at: watched_at
            // watched: watched,
            // created_at: today 
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            renderMovie(data)
        })
}

function editWatched(element, date) {
    const movieId = element.parentElement.id
    let elHTML = element.innerHTML;

    fetch(`http://localhost:3000/movies/${movieId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            watched_at: (elHTML === "Not Watched") ? null : date
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            // renderMovie(element.parentElement, data)
            // listAllMovies()
        })
}

function deleteMovie(movie) {
    let movieId = movie.parentElement.id
    fetch(url + movieId, { method: 'DELETE' })
        .then(() => {
            movie.parentElement.remove()
        })
}

function renderMovie(movie) {
    let movieDiv = document.createElement('div')
    movieDiv.className = 'movie'
    movieDiv.id = movie.id
    let movieEl = document.createElement('p')
    let delMovieButton = document.createElement('button')
    delMovieButton.className = "delete-button"
    delMovieButton.innerHTML = "Delete"

    let movieWatched = document.createElement('div')
    movieWatched.className = "movie-watched"
    movieWatched.innerHTML = "Not Watched"
    // var movieWatched = document.createElement('input')
    // movieWatched.type = "checkbox"
    // movieWatched.name = 'name'
    // movieWatched.value = watched
    let movieDate = document.createElement('p')
    movieEl.innerHTML = movie.title
    // movieWatched.innerHTML = watched
    movieDate.innerHTML = movie.date


    movieDiv.appendChild(movieEl)
    movieDiv.appendChild(movieWatched)
    movieDiv.appendChild(delMovieButton)
    // movieDiv.appendChild(movieDate)

    allMovieContainer.appendChild(movieDiv)
}

listAllMovies()









































































































































































































































