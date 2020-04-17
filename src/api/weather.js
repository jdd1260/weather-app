
import axios from "axios";

const apikey = process.env.REACT_APP_WEATHER_API_KEY;

const api = axios.create({
  baseURL: 'http://dataservice.accuweather.com/'
});

export function findLocations(searchText) {
 return api.get('locations/v1/search', {
   params: {
    apikey,
    q: searchText
   }
 }).then(response => response.data.map(({ Key, EnglishName, Country, AdministrativeArea }) => ({
  id: Key,
  name: EnglishName,
  country: Country.EnglishName,
  province: AdministrativeArea.EnglishName
 })));
}

