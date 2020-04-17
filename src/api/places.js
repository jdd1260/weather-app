
import axios from "axios";

const apiKey = process.env.REACT_APP_PLACE_API_KEY;

const api = axios.create({
  baseURL: 'https://api.opencagedata.com'
});

export function search(searchText) {
 return api.get('/geocode/v1/json', {
   params: {
    key: apiKey,
    q: searchText,
    no_annotations: 1,
    abbrv: 1
   }
 }).then(response => response.data.results.map(({ formatted, geometry }) => ({
  name: formatted,
  lat: geometry.lat,
  lon: geometry.lng
 })));
}

