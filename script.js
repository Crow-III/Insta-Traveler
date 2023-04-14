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