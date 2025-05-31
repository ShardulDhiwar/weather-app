// Load environment variables
const apiKey = process.env.VITE_WEATHER_API_KEY;  // instead of import.meta.env

const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast';
const airQualityApiUrl = 'https://api.openweathermap.org/data/2.5/air_pollution';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const toggleBtn = document.getElementById('toggle-view');
const weatherResult = document.getElementById('weather-result');
const cityName = document.getElementById('city-name');
const errorMessage = document.getElementById('error-message');

let isForecastView = false;

async function getCurrentWeather(city) {
    try {
        const response = await fetch(`${weatherApiUrl}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        
        const weatherCard = document.createElement('div');
        weatherCard.className = 'weather-card';
        weatherCard.innerHTML = `
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
            <h2>${Math.round(data.main.temp)}°C</h2>
            <p class="desc">${data.weather[0].description}</p>
            <div class="weather-details">
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind: ${data.wind.speed} m/s</p>
            </div>
        `;
        
        weatherResult.innerHTML = '';
        weatherResult.appendChild(weatherCard);
    } catch (error) {
        throw error;
    }
}

async function getForecast(city) {
    try {
        const response = await fetch(`${forecastApiUrl}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        
        const forecastContainer = document.createElement('div');
        forecastContainer.className = 'forecast-container';
        
        const dailyForecasts = {};
        data.list.forEach(forecast => {
            const date = new Date(forecast.dt * 1000);
            const day = date.toLocaleDateString('en-US', { weekday: 'short' });
            
            if (!dailyForecasts[day]) {
                dailyForecasts[day] = {
                    temp: forecast.main.temp,
                    description: forecast.weather[0].description,
                    icon: forecast.weather[0].icon,
                    humidity: forecast.main.humidity,
                    wind: forecast.wind.speed,
                    count: 1
                };
            } else {
                dailyForecasts[day].temp += forecast.main.temp;
                dailyForecasts[day].humidity += forecast.main.humidity;
                dailyForecasts[day].wind += forecast.wind.speed;
                dailyForecasts[day].count++;
            }
        });

        Object.entries(dailyForecasts).forEach(([day, forecast]) => {
            const avgTemp = Math.round(forecast.temp / forecast.count);
            const avgHumidity = Math.round(forecast.humidity / forecast.count);
            const avgWind = (forecast.wind / forecast.count).toFixed(1);
            
            const forecastCard = document.createElement('div');
            forecastCard.className = 'forecast-card';
            forecastCard.innerHTML = `
                <h3>${day}</h3>
                <img src="https://openweathermap.org/img/wn/${forecast.icon}@2x.png" alt="${forecast.description}">
                <p class="temp">${avgTemp}°C</p>
                <p class="desc">${forecast.description}</p>
                <div class="weather-details">
                    <p>Humidity: ${avgHumidity}%</p>
                    <p>Wind: ${avgWind} m/s</p>
                </div>
            `;
            forecastContainer.appendChild(forecastCard);
        });

        weatherResult.innerHTML = '';
        weatherResult.appendChild(forecastContainer);
    } catch (error) {
        throw error;
    }
}

async function getWeather(city) {
    try {
        errorMessage.classList.add('hidden');
        weatherResult.classList.add('hidden');
        
        cityName.textContent = city;
        
        if (isForecastView) {
            await getForecast(city);
        } else {
            await getCurrentWeather(city);
        }
        
        weatherResult.classList.remove('hidden');
    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.classList.remove('hidden');
    }
}

toggleBtn.addEventListener('click', () => {
    isForecastView = !isForecastView;
    toggleBtn.textContent = isForecastView ? 'Show Current Weather' : 'Show 7-Day Forecast';
    if (cityInput.value.trim()) {
        getWeather(cityInput.value.trim());
    }
});

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

cityInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
}); 