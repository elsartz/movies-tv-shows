$(document).ready(function() {


    function fetchMoviesList(categorty) {

        const apiUrl = `https://api.watchmode.com/v1/genres/?apiKey=${apiKeys.watchmode}`
    }

    // get Top 10 Tv Shows
    function fetchTvList(category) {

        const apiUrl = `https://imdb-api.com/en/API/${category}/${apiKeys.imdb}`

        $.ajax({
            method: 'GET',
            url: apiUrl,
            dataType: 'json',
            error: function(error) {
                console.log(error)
            },
            success: function(response) {
                // if successful
                console.log(response)
            }
        })


    }


    let eventListener = function(event) {
        let category = event.target.dataset.value
        fetchTvList(category)
    }


    // Event Listerners"
    $('.tv-show-btn').on('click', eventListener)
    $('.movies-btn').on('click', eventListener)


    $('#search-btn').on('click', function() {
        event.stopPropagation();
        console.log('search')
    });

});