var list = ['Stephen Curry', 'Klay Thompson', 'Michael Jordan', 'Kobe Bryant', 'Jimmy Butler'];

var playerDiv = $("#images");

function generateButtons() {
    $("#buttons").empty();
    for (i = 0; i < list.length; i++) {
        var btn = $("<button class='player'/>");
        btn.attr("data-player", list[i].replace(" ", "+"));
        btn.text(list[i]);
        $('#buttons').append(btn);
    }
}


$("#gifBtn").on("click", function(event) {
    event.preventDefault();
    // get the value from the input
    var btnName = $("#gifName").val().trim();
    list.push(btnName);
    generateButtons();
});

function showGifs() {
    playerDiv.empty();
    var player = $(this).attr("data-player");
    console.log(player);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + player + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var p = $("<p>").text("Rating: " + results[i].rating);
                // Creating and storing an image tag
                var playerImg = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                playerImg.attr("src", results[i].images.fixed_height.url);
                playerDiv.append(p);
                playerDiv.append(playerImg);
            }
        })
}
$(document).on("click", ".player", showGifs);
generateButtons();