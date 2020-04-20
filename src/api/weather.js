
import axios from 'axios';
import toDate from 'date-fns/toDate';

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5'
});

export function getCurrentWeather({ lat, lon }, units='imperial') {
 return api.get('/weather', {
   params: {
    appid: apiKey,
    lat,
    lon,
    units
   }
 }).then(({ data }) => data).then(({ weather, main, wind, name, dt, timezone }) => ({
  name,
  temperature: main.temp,
  description: weather[0].main,
  feelsLike: main.feels_like,
  humidity: main.humidity,
  wind: wind.speed,
  icon: `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
  date: toDate((dt+timezone)*1000 + (new Date()).getTimezoneOffset()*60*1000)
 }));
}

