var longi;
var lati;
var weatherIcon;
var weatherDescp;
var city;
var temperatureValue;

// cityName = document.getElementbyId('innerText').value;

function weather() {
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position) {
			lati = position.coords.latitude;
			longi = position.coords.longitude;
			getfetch(lati,longi);

		}); 
	}
	else {
		alert("please enable the location");
	}
}
// calling the weather function
weather();


function getfetch(lati,longi)	{
	var url = "https://fcc-weather-api.glitch.me/api/current?lat="+lati+"&lon="+longi;
	fetch (url)
	.then (function(data) {
		return data.json();
	})
	.then (function (value){
		enteredLocation(value);
	})
}

function enteredLocation(recievedData){
	console.log (recievedData);

	city = recievedData.name +","+ recievedData.sys.country;
	document.getElementById('cityName').innerText = city;
	
	weatherIcon = recievedData.weather[0].icon;
	document.querySelector('#wthIcon').src = weatherIcon;

	weatherDescp = recievedData.weather[0].main +","+ recievedData.weather[0].description;
	document.getElementById('description').innerText = weatherDescp;

	temperatureValue = recievedData.main.temp ;
	document.getElementById('tempValue').innerText = temperatureValue ;
	
	document.querySelector('#celsius').addEventListener('click', function() {
		temperatureValue = recievedData.main.temp ;
		document.getElementById('tempValue').innerText = temperatureValue ;
	});

	document.querySelector('#fahrenheit').addEventListener('click', function() {
		temperatureValue = ((9* recievedData.main.temp)/5) + 32;
		document.getElementById('tempValue').innerText = temperatureValue ;
	});

	
}