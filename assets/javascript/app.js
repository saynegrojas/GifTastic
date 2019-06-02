$(document).ready(function(){
//caching the DOM
const animeButton_div = $("#anime-buttons");
const animeInput_div = $("#anime-input");
const addAnime_div = $("#add-anime");
const anime_div = $("#anime");

//topic array
var topics = ["Dragon Ball Z", "One Punch Man", "Naruto", "One Piece", "Death Note"];
//console.log(topics);


//add buttons for anime
function renderButton(){
    animeButton_div.empty();
    for(var i = 0; i < topics.length; i++){
        animeButton_div.append("<button class='btn btn-info' anime-data='" + topics[i] + "'>" + topics[i] + "</button>" + " ");
    }
}
//call renderButton function
renderButton();

//add a button for an anime and push it to topic array
addAnime_div.on("click", function() {
    
    event.preventDefault();
    //push input to array
    topics.push(animeInput_div.val().trim());
    renderButton();
    
    return ;
});

// Getting gifs from api... into HTML
$("button").on("click", function () {
    var anime = $(this).attr("anime-data");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + anime + "&api_key=PGW1rqdDDHEHBrXcBhwAuPg7Nnivp0UZ&limit=10&";
    //test queryURL for objects
    //console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;

        anime_div.empty();
        for (var i = 0; i < results.length; i++) {
            var animeDiv = $("<div>");
            var pRating = $("<p>").text("Rating: " + results[i].rating);
            var animeImg = $("<img>");
            //anime image + attributes with api calls
            animeImg.attr("src", results[i].images.original_still.url);
            animeImg.attr("data-still", results[i].images.original_still.url);
            animeImg.attr("data-animate", results[i].images.original.url);
            animeImg.attr("data-state", "still");
            animeImg.attr("class", "gif");
            //display gifs to the page
            animeDiv.append(pRating);
            animeDiv.append(animeImg);
            anime_div.append(animeDiv);
        }
    });
});
//change the state when the gif is clicked 
function changeState(){
    var state = $(this).attr("data-state");
    var animateImage = $(this).attr("data-animate");
    var stillImage = $(this).attr("data-still");

    if (state == "still") {
        $(this).attr("src", animateImage);
        $(this).attr("data-state", "animate");
    }

    else if (state == "animate") {
        $(this).attr("src", stillImage);
        $(this).attr("data-state", "still");
    }
}
//call an onclick function with changeState function when a gif is pressed
$(document).on("click", ".gif", changeState);
});
