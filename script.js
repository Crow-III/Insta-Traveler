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
