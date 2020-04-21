
import axios from 'axios';
// import toDate from 'date-fns/toDate';
import utcToZonedTime from 'date-fns-tz/utcToZonedTime';


const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5'
});

const convertDate = (dt, timezone) => utcToZonedTime(dt*1000, timezone);

const getIconUrl = (weather, useLarge) => `http://openweathermap.org/img/wn/${weather[0].icon}${useLarge? '@2x' : ''}.png`;

const extractCurrentWeather = ({ dt, temp, feels_like, humidity, uvi, wind_speed, weather }, timezone) => ({
  temperature: temp,
  description: weather[0].description,
  feelsLike: feels_like,
  humidity: humidity,
  wind: wind_speed,
  uvIndex: uvi,
  icon: getIconUrl(weather, true),
  date: convertDate(dt, timezone),
});

const extractDailyForecast = (daily, timezone) => {
  return daily.map(({ dt, sunrise, sunset, temp, humidity, weather, uvi }) => ({
    min: temp.min,
    max: temp.max,
    description: weather[0].description,
    humidity: humidity,
    uvIndex: uvi,
    icon: getIconUrl(weather),
    date: convertDate(dt, timezone),
    sunrise: convertDate(sunrise, timezone),
    sunset: convertDate(sunset, timezone),
  }));
};

const extractHourlyForecast = (hourly, timezone) => {
  return hourly.map(({ dt, temp, weather }) => ({
    temperature: temp,
    description: weather[0].description,
    icon: getIconUrl(weather),
    date: convertDate(dt, timezone),
  }));
};

export function getWeather({ lat, lon }, units='imperial') {
  return api.get('/onecall', {
    params: {
      appid: apiKey,
      lat,
      lon,
      units
    }
  }).then(({ data }) => data).then(({ current, hourly, daily, timezone }) => ({
    current: extractCurrentWeather(current, timezone),
    daily: extractDailyForecast(daily, timezone),
    hourly: extractHourlyForecast(hourly, timezone),
  }));
}

