
import axios from 'axios';
// import toDate from 'date-fns/toDate';
import utcToZonedTime from 'date-fns-tz/utcToZonedTime';


const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5'
});

const extractCurrentWeather = ({ dt, temp, feels_like, humidity, uvi, wind_speed, weather }, timezone) => ({
  temperature: temp,
  description: weather[0].description,
  feelsLike: feels_like,
  humidity: humidity,
  wind: wind_speed,
  uvIndex: uvi,
  icon: `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
  date: utcToZonedTime(dt*1000, timezone),
});

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
  }));
}

