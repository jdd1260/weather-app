import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form'


import * as places from '../../api/places';

export default function Search() {
  const { handleSubmit, register } = useForm();
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState();

  const doSearch = async ({ searchText }) => {
    if (searchText) {
      try {
        const results = await places.search(searchText);
        setLocations(results);
        if (results.length === 0) {
          setError('There were no results matching your search text');
        }
      } catch(e) {
        setError(`There was an error trying to find matching locations`);
      }
    } else {
      setLocations([]);
    }
  }

  return (
    <div id="Search">
      { error &&
        <div className="error"> 
          {error}
        </div>
      }
      <form onSubmit={handleSubmit(doSearch)}>
        <input type="text" name="searchText" ref={register} placeholder="Location"/>
        <button onClick={doSearch}> Search </button>
      </form>

      { locations.map(location => (
        <Link key={location.name} to={`/locations/lat/${location.lat}/lon/${location.lon}`}>
          <div>
            { location.name }
          </div>
        </Link>
      ))}
    </div>
  )
}