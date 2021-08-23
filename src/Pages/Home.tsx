import React, { useState } from "react";
import { useLazyQuery } from '@apollo/client';
import { GET_WEATHER_QUERY } from '../graphql/Queries';

function Home() {

  const [citySearched, setCitySearched] = useState("");

  const [getWeather, {loading, data, error}] = useLazyQuery(GET_WEATHER_QUERY, {
    variables: { name: citySearched },
  });

  if (error) return <h1>Error found</h1>;
  if (data) {
    console.log(data);
  };

  return (
    <div className="home">
      <h1>GraphQL Weather</h1>
      <input type="text" placeholder="Search by city name" onChange={(event) => {setCitySearched(event.target.value)}} />
      <button onClick={() => getWeather()}>What's the weather?</button>

      <div className="weather">
        {data && (
          <>
            <h2>{data.getCityByName.name}, {data.getCityByName.country}</h2>
            <ul>
              <li>{data.getCityByName.weather.summary.description}</li>
              <li>Temperature: {data.getCityByName.weather.temperature.actual}</li>
              <li>Wind: {data.getCityByName.weather.wind.speed} </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;