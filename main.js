/* globals moment = require("moment") */
const url = 'http://localhost:3000/movies/'
const form = document.querySelector('#mainInput')
let allMovieContainer = document.querySelector('.allMovies')
let movies = document.querySelectorAll('.movie')

// Event Listeners
form.addEventListener ('submit', function(e) {
    e.preventDefault()
    addMovie()
})

document.addEventListener('click', e => {
    if (e.target.className ==="movie-watched") {
        if (e.target.innerHTML !== 'watched') {
        e.target.innerHTML = "watched"
        
        } else {
            e.target.innerHTML = 'not watched'
        }
    }
    return moment().format("MMM Do YY")
})

// for (let movie of movies) {
//     movie.addEventListener('click', e => {
//         console.log('movie clicked') 
//     })
    
// }

function listAllMovies() {
    fetch (url)
        .then(res => res.json())
        .then(data => {
            console.log(data[0].title)
            for (let d of data) {
                renderMovie(d.title, d.watched, d.created_at, d.id)
            }
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
        // created_at: today 
        })})
        .then (res => res.json ())
        .then (data => {
            console.log(data)
        })
}

function editWatched (movie) {

    fetch (`${url}${movie.parentElement.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify ({
            watched_at: moment().format("MMM Do YY")
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        renderMovie(element.parentElement, data)
    })
}



function renderMovie(title, watched, date, id){
    let movieDiv = document.createElement('div')
    movieDiv.className = 'movie'
    movieDiv.id = id
    let movieEl = document.createElement('p')
    let movieWatched = document.createElement('div')
    movieWatched.className = "movie-watched"
    movieWatched.innerHTML = "Not Watched"
    // var movieWatched = document.createElement('input')
    // movieWatched.type = "checkbox"
    // movieWatched.name = 'name'
    // movieWatched.value = watched
    let movieDate = document.createElement('p')
    movieEl.innerHTML = title
    // movieWatched.innerHTML = watched
    movieDate.innerHTML = date


    movieDiv.appendChild(movieEl)
    movieDiv.appendChild(movieWatched)
    // movieDiv.appendChild(movieDate)

    allMovieContainer.appendChild(movieDiv)
}

listAllMovies()

































































































































































































































