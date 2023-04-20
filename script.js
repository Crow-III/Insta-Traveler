//Saving function
async function doAsyncTask() {
    const url = ("http://api.weatherapi.com/v1/current.json?key=96c0061c3971402da99231815231304&q=" +
      new URLSearchParams(city).toString()
    );
  
    const result = await fetch(url).then(response => response.json());
  
    console.log('Fetched from: ' + url);
    console.log(result);
  }

function search() {
    var city = input.value();
}

document.getElementById("searchButton").addEventListener("click", search);
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
      const weatherText = `Temperature: ${celsiusToFahrenheit(temperature)} °F 
        Condition: ${condition} 
        Wind Speed: ${windSpeed} kph 
        Humidity: ${humidity}%`;

        function celsiusToFahrenheit(temperature) {
          var fahrenheit = (temperature * 9/5) + 32;
          return fahrenheit;
        }
        

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
var place = "test"; let rating = "test";
let place2 = "test"; let rating2 = "test";
let place3 = "test"; let rating3 = "test";
let place4 = "test"; let rating4 = "test";
let place5 = "test"; let rating5 = "test";
let checkin = "2023-07-22";
let checkout = "2023-07-25";
let placeid = "test";

// get the search bar element
const searchBar = document.querySelector('#search-bar');
// listen for input changes on the search bar
searchButton.addEventListener('click', () => {
let usernames = document.getElementById("search-input").value;
console.log(usernames);
  // update the location text with the value of the search bar
  locationtext = usernames;
  locationurl = "https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations?search_type=ALL&name="+locationtext;
  console.log(locationtext);
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
  let placeid = response['0']['id'];
});

setTimeout(() => {  console.log(place); 
let hotelurl = "https://priceline-com-provider.p.rapidapi.com/v1/hotels/search?location_id="+ placeid +"&date_checkin="+checkin+"&sort_order=HDR&date_checkout="+checkout+"&rooms_number=1"

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
$.ajax(hotels).done(function (response) {
  // Get the top 5 hotel names and ratings
  const hotelList = response['hotels'].slice(0, 5).map(hotel => {
    const name = hotel['name'];
    const rating = hotel['overallGuestRating'];
    return `${name} (Overall Guest Rating: ${rating})`;
  });
  // Append the hotel names and ratings to the HTML element
  $('#hotel-list').append(`<ul><li>${hotelList.join('</li><li>')}</li></ul>`);
});
}, 3000);})