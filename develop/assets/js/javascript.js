let menuItem = '';
let start = 0;
let end = 10;
let res;
const min = 0
const max = 250


var fullTitle = "";
var netFlix = "";
var prime = "";
var hulu = "";

var modalEl = document.getElementById("modal");
console.log(modalEl);

$(document).ready(function() {


    // Functions to open and close a modal
    function openModal($target) {
        modalEl.classList.add('is-active');
    }

    function closeModal($el) {
        modalEl.classList.remove('is-active');
    }



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
                // alert("Unable to connect to Movies API");

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
                // alert("Unable to connect to Movies API");
                openModal(modalEl);
                $('#modal').on('click', function(event) {
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
                console.log(response)

                if (category === "Top250TVs") {
                    displayTop10Tv(response)

                } else {
                    displayMostPopTv(response, 0, 10)

                }
            }
        });
    }

    // display 10 random tv show listings
    function displayTop10Tv(response) {
        var listArray = [];

        function randomList(response) {

            const min = 0;
            const max = 100;

            if ($('.show-listings-header').length) {
                $('.p-title').empty()
            }

            $('.p-title').append(`${menuItem}`)
            $('.p-title').append(`<div class="column show-tv-lists"></div>`)

            for (let i = 0; i < 10; i++) {
                let random = Math.floor(Math.random() * (max - min)) + min
                listArray.push(response.items[random].id);
                console.log(listArray);

                $('.show-tv-lists').append(`
            <div class="column has-text-dark has-background-light show-tv-posters mt-3 mb-3 is-size-5 is-inline-block">
            <img class="tv-poster src="${response.items[random].image}" data-value="${random}"width="120px" height="120px">
        <p>${response.items[random].fullTitle}</p>
        </div>
        `)
            }


            // // show more info when user click on poster
            $('.tv-poster').on('click', function(event) {
                event.stopPropagation();

                let id = event.target.dataset.value
                    // showMoreInfoTv(response, tvInfo)
                modal(response, id)
            })

        }

        function modal(response, id) {

            // open the modal
            $('#modal-js').addClass('is-active')

            // display tv info

            $('.box-info').append(`
        <div class="tv-info">
        <p>Title: ${response.items[id].fullTitle}</p>
        <p>Rating: ${response.items[id].imDbRating}</p>
        <p>year: ${response.items[id].year}</p>
        </div>
        
        `)


            // close the modal
            $('#modal-js').on('click', function(event) {
                if (!$(event.target).closest('.modal-content, modal').length) {
                    $('body').find('.modal').removeClass('is-active');
                }

            })



            // $('#modal-js').on('click', function() {S
            //     $('#modal-js').removeClass('is-active')



        };






        function displayMostPopTv(response, start, end) {

            res = response;

            if ($('.show-listings-header').length) {
                $('.p-title').empty()
            }

            $('.p-title').append(`${menuItem}`)
            $('.p-title').append(`<div class="column show-tv-lists"></div>`)

            // $.each(response, function(index) {
            for (let i = start; i < end; i++) {
                $('.show-tv-lists').append(`
            <div class="column has-text-dark has-background-light show-tv-posters mt-3 mb-3 is-size-5 is-inline-block">
            <img src="${response.items[i].image}" width="120px" height="120px" >
            <p>${response.items[i].fullTitle}</p>
            <p><strong># ${response.items[i].rank}</p>
        </div>
        `)
            };

            $('.p-title').append(`<div class="column has-background-dark more-icon">
        <span class="material-icons icon-left">keyboard_double_arrow_left</span>
        <span class="material-icons icon-right">keyboard_double_arrow_right</span>
        </div>`)


            $('.icon-left').on('click', function() {

                if (end == 10) {
                    $('.show-listings-list').append(`<1>No more result!`)
                    return;
                }

                if (start != 0) {
                    start -= 10;
                    end -= 10;

                } else if ($('.show-tv-lists').length) {
                    $('.show-listings-tv').empty()
                    $('.material-icons').empty();
                }

                displayMostPopTv(response, start, end)
            });


            $('.icon-right').on('click', function() {


                start += 10;
                end += 10;

                if (end > 100) {
                    $('.show-listings-list').append(`<1>No more result!`)
                    return;
                }

                if ($('.show-tv-lists').length) {
                    $('.show-listings-tv').empty()
                    $('.material-icons').empty();
                }
                displayMostPopTv(response, start, end)
            });

        } // end of displayMostPopTv

        // get more Tv Info


        // Event Listerners


    }

    // Event Listerners"
    $('.tv-show-btn').on('click', function(event) {
        event.stopPropagation();

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
        // console.log('search')
    });

    streamingSites("tt8740790");
});