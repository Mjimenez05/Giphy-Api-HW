$(document).ready(function() {

    var topics = [
        "Darth Vader",
        "That 70's show",
        "Dogs",
        "Formula 1",
        "Mountain Biking",
        "Skiing",
        "Escape From Tarkov",
        "Rally Racing",
        "Space",
        "Coffee",
    ];

    var renderButtons = function() {
        for (i = 0; i < topics.length; i++) {
            $("#buttonville").append(`<button class="btn btn-sm btn-dark giphy-button" data-subject="${topics[i]}">${topics[i]}</button>`)
        }
    }

    renderButtons();

    // clicking/submitting the #magic-maker
    $("#magic-maker").click(function() {
        event.preventDefault();
        var newTopic = $("#topic").val().trim();
        topics.push(newTopic);
        $("#buttonville").empty();
        renderButtons();

    })

    // clicking any giphy buttons
    $("#buttonville").on("click", ".giphy-button", function() {
        $("#gif-catcher").empty();
        var giphySubject = $(this).attr("data-subject"),
            queryURL = `https://api.giphy.com/v1/gifs/search?q=${giphySubject}&api_key=dc6zaTOxFJmzC&limit=10`;
        console.log(queryURL)

        //AJAX request to giphy
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response) {
            for (i = 0; i <= 9; i++) {
                $("#gif-catcher").append(`<div class="each-gif"><img src="${response.data[i].images.fixed_height_still.url}" data-still="${response.data[i].images.fixed_height_still.url}" data-animate="${response.data[i].images.fixed_height.url}" data-state="still" class="gif" alt="${response.data[i].title}"><p>Rating: ${response.data[i].rating.toUpperCase()}</p></div>`);
            }
        })
    });

    // click a gif to animate, or make still
    $("#gif-catcher").on("click", "img", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

});