let menuItem = '';

var fullTitle = "";
var netFlix = "";
var prime = "";
var hulu = "";

$(document).ready(function() {

    var streamingSites = function(imDbId) {
        var apiUrl = `https://imdb-api.com/en/API/ExternalSites/${apiKeys.imdb}/${imDbId}`;
    
        fetch(apiUrl).then(function(response) {
            if (response.ok) {
              response.json().then(function(data) {
                console.log(data);
                fullTitle = data.fullTitle;
                console.log(fullTitle);
                if (data.netflix !== null) {
                    console.log(data.netflix.url);
                }
              });
            } 
          })
          .catch(function(error) {
            // If no response then report network error
            alert("Unable to connect to Movies API");
          });
    }





// get movies random list of 10
    function fetchMoviesList(category) {

        const apiUrl = `https://imdb-api.com/en/API/${category}/${apiKeys.imdb}`

        fetch(apiUrl).then(function(response) {
            if (response.ok) {
              response.json().then(function(data) {
                console.log(data);
                
      
                randomList(data);

              });
            } 
          })
          .catch(function(error) {
            // If no response then report network error
            alert("Unable to connect to Movies API");
          });
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

    var listArray = [];

    function randomList(response) {

        const min = 0;
        const max = 100;

        if ($('.show-listings-header').length) {
            $('.p-title').empty()
        }

        $('.p-title').append(`${menuItem}`)
        $('.p-title').append(`<div class="column has-background-danger show-tv-lists"></div>`)

        for (let i = 0; i < 10; i++) {
            let random = Math.floor(Math.random() * (max - min)) + min
                listArray.push(response.items[random].id);
                console.log(listArray);
            
            $('.show-tv-lists').append(`
            <div class="column has-text-dark has-background-light show-listings-tv mt-3 mb-3 is-size-5 is-rounded is-inline-block">
            <img src="${response.items[random].image}" width="150px" height="150px">
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
        var category = event.target.dataset.value;

        if (category === "Top250Movies") {
            menuItem = $('#1').text();
        } else {
            menuItem = $('#2').text();
        }
        fetchMoviesList(category);

        // event.stopPropagation();
    })


    $('#search-btn').on('click', function(event) {
        event.stopPropagation();
        console.log('search')
    });

    streamingSites("tt8740790");
});


