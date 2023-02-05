// API key for OpenWeatherMap
const API_KEY = "ff1901c831e8cad199f1473307970666";

// Form element
const form = document.querySelector("#search-form");

// Search input element
const searchInput = document.querySelector("#search-input");

// Today section element
const todaySection = document.querySelector("#today");

// Forecast section element
const forecastSection = document.querySelector("#forecast");

// Search history list group element
const historyList = document.querySelector("#history");

// Submit form event listener
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = searchInput.value;
  searchWeather(city);
});

// Search weather for the given city
function searchWeather(city) {
  // API endpoint for current weather
  const currentWeatherEndpoint = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  // API endpoint for 5-day forecast
  const forecastEndpoint = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;

  // Fetch current weather data
  fetch(currentWeatherEndpoint)
    .then((response) => response.json())
    .then((data) => {
      displayCurrentWeather(data);
    });

  // Fetch 5-day forecast data
  fetch(forecastEndpoint)
    .then((response) => response.json())
    .then((data) => {
      displayForecast(data);
    });

  // Add city to search history
  addToSearchHistory(city);
}

// Display current weather data on the page
function displayCurrentWeather(data) {
  // City name
  const cityName = data.name;

  // Current date
  const currentDate = moment().format("DD/MM/YYYY");

  // Weather icon
  const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  // Temperature
  const temperature = (data.main.temp - 273.15).toFixed(1);

  // Humidity
  const humidity = data.main.humidity;

  // Wind speed
  const windSpeed = data.wind.speed;

  // Clear previous data
  todaySection.innerHTML = "";

  // Append current weather data to the today section
  todaySection.innerHTML = `
    <h2 class="h3">Current weather in ${cityName}</h2>
    <p>Date: ${currentDate}</p>
    <img src="${icon}" alt="Weather icon">
    <p>Temperature: ${temperature} &#8451;</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} mph</p>
  `;
}

// Display 5-day forecast on the page
function displayForecast(data) {
    // Clear previous data
    forecastSection.innerHTML = "";
  
    // Get forecast data for every 3 hours for the next 5 days
    const forecastData = data.list.filter((reading) => {
        return (
          moment.unix(reading.dt).diff(moment(), "days") < 5
        );
      });
      
    // Get only the first 5 items from forecastData array
    const fiveDayForecast = forecastData.slice(0, 5);
  
    // Append forecast data to the forecast section
    fiveDayForecast.forEach((reading) => {
      // Forecast date
      const forecastDate = moment.unix(reading.dt).format("DD/MM/YYYY");
      // Forecast icon
      const icon = `http://openweathermap.org/img/wn/${reading.weather[0].icon}@2x.png`;
      // Forecast temperature
      const temperature = reading.main.temp;
      // Forecast humidity
      const humidity = reading.main.humidity;
  
      forecastSection.innerHTML += `
        <div class="col-md-2">
          <div class="card">
            <div class="card-body">
              <h3>${forecastDate}</h3>
              <img src="${icon}" />
              <p>Temperature: ${temperature} &#8451;</p>
              <p>Humidity: ${humidity}%</p>
            </div>
          </div>
        </div>
      `;
    });
}


// Add city to search history
function addToSearchHistory(city) {
    // Create a new list item
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.textContent = city;
  
    // Append list item to the history list
    historyList.appendChild(listItem);
  }
  
  function displayForecast(data) {
    // Clear previous data
    forecastSection.innerHTML = "";
  
    // Loop through 5 days
    for (let i = 0; i < 5; i++) {
      // Get the data for each day
      const dayData = data.list.filter((reading) => {
        return (
          moment.unix(reading.dt).diff(moment(), "days") === i
        );
      });
  
      // Get the first reading for the day (which should be the first reading for that day)
      const firstReading = dayData[0];
  
      // Forecast day of the week
      const forecastDay = moment.unix(firstReading.dt).format("dddd");
      // Forecast wind speed
      const windSpeed = firstReading.wind.speed;
      // Forecast icon
      const icon = `http://openweathermap.org/img/wn/${firstReading.weather[0].icon}@2x.png`;
      // Forecast temperature
      const temperature = firstReading.main.temp;
      // Forecast humidity
      const humidity = firstReading.main.humidity;
  
      // Append forecast data to the forecast section
      forecastSection.innerHTML += `
        <div class="col-md-3">
          <div class="card">
            <div class="card-body">
              <h3>${forecastDay}</h3>
              <img src="${icon}" />
              <p>Temperature: ${temperature} &#8451;</p>
              <p>Humidity: ${humidity}%</p>
              <p>Wind Speed: ${windSpeed} m/s</p>
            </div>
          </div>
        </div>
      `;
    }
  }
  
  
  
  
