const weatherApiKey = "9daf7471c5f84d968a520146231304"; // Replace with your actual Weather API key
const unsplashApiKey = "QylNPlf1q1ZEVXUKTBc1XTe_iytPyjIo1Wweq_zg4tQ"; // Replace with your actual Unsplash API access key
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");

searchButton.addEventListener("click", () => {
  const city = searchInput.value;
  if (city.trim() === "") {
    alert("Please enter a valid city name!");
    return;
  }

  // Fetch weather information using Weather API
  const weatherApiUrl = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}`;
  fetch(weatherApiUrl)
    .then(response => response.json())
    .then(weatherData => {
      // Fill in search bar with city name
      searchInput.value = weatherData.location.name;

      // Display weather information
      const temperature = weatherData.current.temp_c;
      const condition = weatherData.current.condition.text;
      const windSpeed = weatherData.current.wind_kph;
      const humidity = weatherData.current.humidity;
      const weatherText = `Temperature: ${temperature} °C 
        Condition: ${condition} 
        Wind Speed: ${windSpeed} kph 
        Humidity: ${humidity}%`;

      // Create HTML element to display weather information
      const weatherContainer = document.createElement("div");
      const weatherTextNode = document.createTextNode(weatherText);
      weatherContainer.appendChild(weatherTextNode);
      document.body.appendChild(weatherContainer);

      // Fetch image using Unsplash API
      const unsplashApiUrl = `https://api.unsplash.com/photos/random?query=${city}&client_id=${unsplashApiKey}`;
      fetch(unsplashApiUrl)
        .then(response => response.json())
        .then(imageData => {
          // Create HTML element to display image
          const imageContainer = document.createElement("div");
          const image = document.createElement("img");
          image.src = imageData.urls.regular;
          imageContainer.appendChild(image);
          document.body.appendChild(imageContainer);
        })
        .catch(error => {
          console.error(error);
        });
    })
    .catch(error => {
      alert("Error fetching weather information!");
      console.error(error);
    });
});
// //Saving function
// function save() {
//     //Reads the value of the input boxes and saves it as a string
//     var newData = document.getElementById("input").value;
//     //Stores the string in an array
//     if(localStorage.getItem("city") == null) {
//         localStorage.setItem("city", "[]");
//     }
//     //Makes the new content a part of the array
//     var oldData = JSON.parse(localStorage.getItem("city"));
//     oldData.push(newData);
    
//     localStorage.setItem("city", JSON.stringify(oldData));
// }
//     //This is the button  that calls upon the 'save' function. It awaits the loading of the page to run
// document.addEventListener('DOMContentLoaded', function() {
//     var button = document.getElementById('saveButton');
//     button.addEventListener('click', save);
//   });
//Search Hotel

var place = "test"; let rating = "test"; 
let place2 = "test"; let rating2 = "test";
let place3 = "test"; let rating3 = "test";
let place4 = "test"; let rating4 = "test";
let place5 = "test"; let rating5 = "test";
let checkin = "2023-07-22";
let checkout = "2023-07-25";

//Change to change location
let locationtext = "New York"; //query selector for location in search bar
let locationurl = "https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations?search_type=ALL&name="+locationtext

//Search for location city ID
const settings = {
	"async": true,
	"crossDomain": true,
	"url": locationurl,
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "203e312f55mshe6922c290742301p1cbbccjsne29ed8a8992e",
		"X-RapidAPI-Host": "priceline-com-provider.p.rapidapi.com"
	}
};
$.ajax(settings).done(function (response) {
	console.log(response);
  placeid = response['0']['id'];
});

setTimeout(() => {  console.log(place); 
let hotelurl = "https://priceline-com-provider.p.rapidapi.com/v1/hotels/search?location_id="+placeid+"&date_checkin="+checkin+"&sort_order=HDR&date_checkout="+checkout+"&rooms_number=1"

//API Call for hotels near city stated in locationtext variable
const hotels = {
	"async": true,
	"crossDomain": true,
	"url": hotelurl,
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "203e312f55mshe6922c290742301p1cbbccjsne29ed8a8992e",
		"X-RapidAPI-Host": "priceline-com-provider.p.rapidapi.com"
	}
};

$.ajax(hotels).done(function (response) {
	console.log(response);
  console.log("5 Hotels near city: " + locationtext);
  place = response['hotels']['1']['name'];
  place2 = response['hotels']['2']['name'];
  place3 = response['hotels']['3']['name'];
  place4 = response['hotels']['4']['name'];
  place5 = response['hotels']['5']['name'];
  rating = response['hotels']['1']['overallGuestRating'];
  rating2 = response['hotels']['2']['overallGuestRating'];
  rating3 = response['hotels']['3']['overallGuestRating'];
  rating4 = response['hotels']['4']['overallGuestRating'];
  rating5 = response['hotels']['5']['overallGuestRating'];
console.log(place+" Overall Guest Rating "+rating);
console.log(place2+" Overall Guest Rating "+rating2);
console.log(place3+" Overall Guest Rating "+rating3);
console.log(place4+" Overall Guest Rating "+rating4);
console.log(place5+" Overall Guest Rating "+rating5);

});


}, 3000);

