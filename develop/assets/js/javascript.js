var modalEl = $("#modal-js");

let menuItem;

let start = 0;
let end = 10;

var fullTitle = "";
var netFlix = "";
var prime = "";
var hulu = "";

const min = 0
const max = 250

$(document).ready(function() {

            var streamingSites = function(imDbId) {
                var apiUrl = `https://imdb-api.com/en/API/ExternalSites/${apiKeys.imdb}/${imDbId}`;

                fetch(apiUrl).then(function(response) {
                        if (response.ok) {
                            response.json().then(function(data) {

                                fullTitle = data.fullTitle;
                                if (data.netflix !== null) {
                                    return
                                }
                            });
                        }
                    })
                    .catch(function(error) {

                    });
            }

            // fetch movies
            function fetchMoviesList(category) {

                const apiUrl = `https://imdb-api.com/en/API/${category}/${apiKeys.imdb}`

                fetch(apiUrl).then(function(response) {
                        if (response.ok) {
                            response.json().then(function(data) {
                                // console.log(data);
                                if (category === "Top250Movies") {
                                    displayTopTen(data)
                                } else {
                                    displayMostPopular(data, start, end)
                                }
                            });
                        }
                    })
                    .catch(function(error) {
                        openModal(modalEl);
                        $('#modal-js').on('click', function(event) {
                            closeModal(modalEl);
                        });

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
                        // console.log(response)
                        if (category === "Top250TVs") {
                            displayTopTen(response)
                        } else {
                            displayMostPopular(response, start, end)
                        }
                    }
                });
            }

            // display 10 random list
            function displayTopTen(response) {

                if ($('.show-list-header').length) {
                    $('.p-title').empty()
                }

                $('.p-title').append(`${menuItem}`)
                $('.p-title').append(`<div class="column show-list"></div>`)

                for (let i = 0; i < 10; i++) {
                    let random = Math.floor(Math.random() * (max - min)) + min
                    $('.show-list').append(`
            <div class="column has-text-dark has-background-light show-posters mt-3 mb-3 is-size-5 is-inline-block">
            <img class="poster" src="${response.items[random].image}" data-value="${random}"width="120px" height="120px">
        <p>${response.items[random].fullTitle}</p>
        </div>
        `)
                }

                // // show more info when user click on poster
                $('.poster').on('click', function(event) {
                    event.stopPropagation();

                    let id = event.target.dataset.value
                        // showMoreInfoTv(response, tvInfo)
                    console.log(id)
                    moreInfoModal(response, id)
                })

            }

            // modal
            function moreInfoModal(response, id) {

                let rating = Math.floor(response.items[id].imDbRating);
                console.log(rating)
                    // open the modal
                $('#modal-js').addClass('is-active')

                $('.box-info').append(`
        <div class="more-info">
        <div class="modal-items">
        <img src="${response.items[id].image}" width="200px" height="200px">
        <p>Title: ${response.items[id].fullTitle}</p>
        <p>Actors/Actresses: ${response.items[id].crew}</p>
        <p>year: ${response.items[id].year}</p>
        <div class="rating">
        <p>Rating:
        ${Array(rating).fill().map((item, i) => `
          <img src="./assets/img/rating.png" width="20px" heigh=20px"></img>`).join('')}
      </div>
      <p>Rank:  ${response.items[id].rank}
        `)

        // close the modal
        $('#modal-js').on('click', function(event) {
            if (!$(event.target).closest('.modal-content, modal').length) {
                $('body').find('.modal').removeClass('is-active');
                $('.box-info').html('')
            }
        });
    } // end of modal()

    function displayMostPopular(response, start, end) {

        if ($('.show-list-header').length) {
            $('.p-title').empty()
        }

        $('.p-title').append(`${menuItem}`)
        $('.p-title').append(`<div class="column show-list"></div>`)

        // $.each(response, function(index) {
        for (let i = start; i < end; i++) {
            $('.show-list').append(`
            <div class="column has-text-dark has-background-light show-posters mt-3 mb-3 is-size-5 is-inline-block">
            <img class="poster" src="${response.items[i].image}" data-value="${i}" width="120px" height="120px" >
            <p>${response.items[i].fullTitle}</p>
            <p><strong># ${response.items[i].rank}</p>
        </div>
        `)
        };

        $('.p-title').append(`<div class="column more-icon">
        <span class="material-icons icon-left">keyboard_double_arrow_left</span>
        <span class="material-icons icon-right">keyboard_double_arrow_right</span>
        </div>`)

        $('.icon-left').on('click', function() {

            if (end == 10) {
                $('.show-list').append(`<1>No more result!`)
                return;
            }

            if (start != 0) {
                start -= 10;
                end -= 10;

            } else if ($('.show-list').length) {
                $('.show-listing').empty()
                $('.material-icons').empty();
            }

            displayMostPopular(response, start, end)
        });

        $('.icon-right').on('click', function() {
            start += 10;
            end += 10;

            if (end > 100) {
                $('.show-listingt]').append(`<1>No more result!`)
                return;
            }

            if ($('.show-list').length) {
                $('.show-listing').empty()
                $('.material-icons').empty();
            }
            displayMostPopular(response, start, end)
        });

                       // // show more info when user click on poster
                       $('.poster').on('click', function() {
                        event.stopPropagation();
    
                        let id = event.target.dataset.value
                            // showMoreInfoTv(response, tvInfo)
                        moreInfoModal(response, id)
                    })
    } // end of displayMostPopTv

    // Functions to open and close a modal
    function openModal(el) {
        console.log(modalEl)
        modalEl[0].classList.add('is-active');
        document.querySelector('.box-info').textContent = 'Unable to connect to Movies API'
     
    }

    function closeModal(el) {
        modalEl[0].classList.remove('is-active');
    }

    // Event Listerners"
    $('.tv-show-btn').on('click', function(event) {
        event.stopPropagation();

        if ($('.show-list-header').length) {
            $('.p-title').empty()
        }


        let category = event.target.dataset.tv

        if (category === "Top250TVs") {
            menuItem = $('#1').text()
        } else {
            menuItem = $('#2').text()
        }
        console.log(category)
        fetchTvList(category)
    });


    $('.movies-btn').on('click', function(event) {
        event.stopPropagation();

        if ($('.show-list-header').length) {
            $('.p-title').empty()
        }


        var category = event.target.dataset.movie;
        console.log(category)
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
        // console.log('search')
    });

});