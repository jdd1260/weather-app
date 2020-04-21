import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import formatDate from 'date-fns/format';
import * as qs from "qs";

import * as weatherApi from "../../api/weather";
import CurrentWeather from "../current-weather";
import DailyWeather from "../daily-weather";
import HourlyWeather from "../hourly-weather";

export default function WeatherLanding() {
  const { lat, lon } = useParams();
  const [conditions, setConditions] = useState();
  const [units, setUnits] = React.useState(
    () => window.localStorage.getItem('unitSystem') || 'imperial'
  );
  React.useEffect(() => {
    window.localStorage.setItem('unitSystem', units)
  }, [units])

  useEffect(() => {
    async function fetchWeather() {
      if (lat != null && lon != null) {
        setConditions(undefined);
        const info = await weatherApi.getWeather({ lat, lon }, units);
        setConditions(info);
      }
    }
    fetchWeather();
  }, [lat, lon, units]);

  const { search } = useLocation();
  let { name } = qs.parse(search, { ignoreQueryPrefix: true });
  if (!name) {
    name = `Latitude ${lat}, Longitude ${lon}`;
  }

  if (!conditions) return 'Loading Weather...';

  return (
    <div id="WeatherLanding">
      <h1> Weather for {name} at { formatDate(conditions.current.date, "h:mm a 'Local Time on' MMMM d, y")}</h1>
      <button onClick={() => setUnits('imperial')} className={units=== 'imperial' ? 'selected' : ''}>F</button>
      <button onClick={() => setUnits('metric')}  className={units=== 'metric' ? 'selected' : ''}>C</button>

      <CurrentWeather conditions={conditions.current} units={units} />
      <HourlyWeather forecast={conditions.hourly} units={units} />
      <DailyWeather forecast={conditions.daily} units={units} />
    </div>
  )
}

