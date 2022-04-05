$(document).ready(function() {


    function fetchMoviesList() {

    }

    // get Top 10 Tv Shows
    function fetchTvList() {

        apiUrl = `https://imdb-api.com/en/API/Search`


    }








    function navBarDropDownTV() {

        $('.navbar-dropdown').append(`
   
    `)

    }

    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $('#tv-show-btn').on('click', navBarDropDownTV)

    $('#search-btn').on('click', function() {
        console.log('search')
    })

    $('#movies-btn').on('click', function() {
        console.log('movie')
    })

});