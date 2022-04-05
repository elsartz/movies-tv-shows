let menuItem = '';

$(document).ready(function() {


    function fetchMoviesList(category) {

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
                randomList(response)
            }
        });
    }

    function randomList(response) {

        const min = 0
        const max = 10

        if ($('.show-listing-header').length) {
            $('.p-title').empty()
        }
        $('.p-title').append(`${menuItem}`)

        for (let i = 0; i < 10; i++) {
            let random = Math.floor(Math.random() * (max - min)) + min
            $('.display-section-title').append(`
        <div class="show-tv-list">
        <p>${response.items[random].fullTitle}</p>
        </div>
        `)
        }



    }




    // Event Listerners"
    $('.tv-show-btn').on('click', function(event) {
        let category = event.target.dataset.value

        if (category === "Top250TVs") {
            menuItem = $('#1').text()
        } else {
            menuItem = $('#2').text()
        }
        fetchTvList(category)
    });

    $('.movies-btn').on('click', function(event) {
        event.stopPropagation();
    })


    $('#search-btn').on('click', function(event) {
        event.stopPropagation();
        console.log('search')
    });


});