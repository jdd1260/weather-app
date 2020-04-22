import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import formatDate from 'date-fns/format';
import * as qs from "qs";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import * as weatherApi from "../../api/weather";
import CurrentWeather from "../current-weather";
import DailyWeather from "../daily-weather";
import HourlyWeather from "../hourly-weather";

import './index.scss';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      className="tab-panel"
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

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
        const info = await weatherApi.getWeather({ lat, lon }, units);
        setConditions(info);
      }
    }
    fetchWeather();
  }, [lat, lon, units]);

  const { search } = useLocation();
  

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!conditions) return 'Loading Weather...';

  let { name } = qs.parse(search, { ignoreQueryPrefix: true });
  if (!name) {
    name = `Latitude ${lat}, Longitude ${lon}`;
  }

  return (
    <div id="WeatherLanding">
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Current" />
          <Tab label="48 Hour"  />
          <Tab label="7 Day"  />
        </Tabs>
      </AppBar>
      <ButtonGroup color="secondary" className="units-buttons">
          <Button onClick={() => setUnits('metric')}  variant={units=== 'metric' ? 'contained' : 'outlined'}>C</Button>
          <Button onClick={() => setUnits('imperial')} variant={units=== 'imperial' ? 'contained' : 'outlined'}>F</Button>
        </ButtonGroup>
      <div className="title"> 
        {name} at { formatDate(conditions.current.date, "h:mm a 'Local Time on' MMMM d, y")}
 
      </div>

      <TabPanel value={value} index={0}>
        <CurrentWeather conditions={conditions.current} units={units} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <HourlyWeather forecast={conditions.hourly} units={units} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DailyWeather forecast={conditions.daily} units={units} />
      </TabPanel>
    </div>
  );
}