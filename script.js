//Saving function
function save() {
    //Reads the value of the input boxes and saves it as a string
    var newData = document.getElementById("input").value;
    //Stores the string in an array
    if(localStorage.getItem("city") == null) {
        localStorage.setItem("city", "[]");
    }
    //Makes the new content a part of the array
    var oldData = JSON.parse(localStorage.getItem("city"));
    oldData.push(newData);
    
    localStorage.setItem("city", JSON.stringify(oldData));
}
    //This is the button  that calls upon the 'save' function. It awaits the loading of the page to run
document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('saveButton');
    button.addEventListener('click', save);
  });