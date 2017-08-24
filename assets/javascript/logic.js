var topics = ["wrestling", "ric flair", "stone cold", "macho man", "kurt angle", "mark henry", "hulk hogan", "john cena", "undertaker"];


function renderButtons(){
	$(".buttons").empty();

	for (var i = 0; i < topics.length; i++) {
		
		var b = $("<button>");

		b.addClass("renderedBtn")

		b.attr("data-name", topics[i]);

		b.text(topics[i]);
		
		$(".buttons").append(b);
	}
}

renderButtons();


$("#submitBtn").on("click", function(event){
	event.preventDefault();

	var userInput = $("#searchTxt").val().trim();



	topics.push(userInput);


	renderButtons();
	$("#searchTxt").val('');

})



$(document).on('click', ".renderedBtn", function(){

	$("#gifs").empty();

	
	var arraySelect = $(this).text();



	
	var topicStr = arraySelect.replace(/ /g, '+');



	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicStr + 
	"&api_key=79a6a256a3fa4401870a9d50816a34b1&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	})
	.done(function(response){
		console.log(response);


	var data = response.data;

	for (var i = 0; i < data.length; i++) {

		var gifDiv = $("<div>");
		gifDiv.addClass("gifWrapper");

		var still = data[i].images.fixed_height_still.url;


		var animate = data[i].images.fixed_height.url;

		var p = $("<p/>");

		p.text("Rating: " + data[i].rating);

		var pic = $("<img/>");

		pic.addClass("gif");

		pic.attr("src", still);

		pic.attr("data-still", still);

		pic.attr("data-animate", animate);

		pic.attr("data-state", "still");


		gifDiv.append(p);
		gifDiv.append(pic);

		$("#gifs").prepend(gifDiv);
	};



	});

});

$(document).on('click', '.gif', function(){
	var datastate = $(this).attr("data-state");


	if (datastate === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
		
	}
	else{
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
		
	}
	console.log(this);

});