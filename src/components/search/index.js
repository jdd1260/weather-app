import React, { useState } from 'react';
import { Link } from "react-router-dom";
import * as qs from 'qs';
import TextField from '@material-ui/core/TextField'; 
import Button from '@material-ui/core/Button';

import * as places from '../../api/places';
import './index.scss';

export default function Search() {
  const [locations, setLocations] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const doSearch = async () => {
    if (searchText) {
      try {
        setIsLoading(true);
        const results = await places.search(searchText);
        setIsLoading(false);
        setLocations(results);
        if (results.length === 0) {
          setError('There were no results matching your search text');
        } else {
          setError();
        }
      } catch(e) {
        setError(`There was an error trying to find matching locations`);
      }
    } else {
      setLocations([]);
    }
  }

  const keyPress = (e) => {
    if (e.keyCode === 13) { 
      doSearch()
    }
  }

  return (
    <div id="Search">
      <div className="form">
        <div className="input">
          <TextField
            name="searchText"
            placeholder="Weather Location"
            onChange={ e => setSearchText(e.target.value)}
            onKeyDown={keyPress}
            disabled={isLoading}
          />
        </div>
        <div className="button">
          <Button variant="contained" color="primary" onClick={doSearch} disabled={isLoading}>
            Search
          </Button>
        </div>
      </div>
      { error &&
        <div className="results error"> 
          {error}
        </div>
      }
      {locations.length > 0 &&
        <div className="results">
          Did you mean?
          { locations.map(location => (
            <div className="link" key={location.name}>
              <Link to={`/locations/lat/${location.lat}/lon/${location.lon}?${qs.stringify({ name: location.name })}`}>
                { location.name }
              </Link>
            </div>
          ))}
        </div>
      }
    </div>
  )
}