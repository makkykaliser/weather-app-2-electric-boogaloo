'use client'
import Icon from '@mdi/react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { TextField, Select, MenuItem } from "@mui/material";
import {IconButton} from "@mui/material";
import {Button} from "@mui/material";

import { mdiMagnify } from '@mdi/js';
import { useState } from 'react';
import { weekdays, daytimes } from './util/enum';



export default function Home() {
  const [data, setData] = useState([])
  const [location, setLocation] = useState('')
  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')
  const [forecastUrl, setForecastUrl] = useState('')

  navigator.geolocation.getCurrentPosition((geo) => {
    console.debug(geo)
    setLat(geo.coords.latitude)
    setLong(geo.coords.longitude)
  })

  function doSearch() {
    fetch(`https://api.weather.gov/points/${lat},${long}`, {method: 'GET'})
    .then((r) => {
      console.debug(r)
      r.json().then((json) => {
        console.debug(json)
        setLocation(`${json.properties.relativeLocation.properties.city}, ${json.properties.relativeLocation.properties.state}`)
        console.debug(location)
        console.debug(json.properties.forecast)
        setForecastUrl(json.properties.forecast)
        fetch(json.properties.forecast, {method: 'GET'})
        .then((r) => {
          console.debug(r)
          r.json().then((json) => {
            console.debug(json)
            setData(json.properties.periods)
            console.debug(data)
          })
        })
      })
    })
  }

  function getData() {
    fetch(forecastUrl, {method: 'GET'})
        .then((r) => {
          console.debug(r)
          r.json().then((json) => {
            console.debug(json)
            setData(json.properties.periods)
            console.debug(data)
          })
        })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Grid container spacing={2}>
        <Grid>
          <Select>
            {Object.keys(weekdays).map((d) => (
              <MenuItem key={d}>{d}</MenuItem>
            ))}
          </Select>
          <TextField
          label="Latitude" 
          variant="outlined" 
          value={lat}
          onChange={event => setLat(event.target.value)}
          />
        </Grid>
        <Grid>
          <TextField
          label="Longitude" 
          variant="outlined" 
          value={long}
          onChange={event => setLong(event.target.value)}
          />        
        </Grid>
        <Grid>
          <IconButton onClick={doSearch}>
            <Icon path={mdiMagnify} size={2} color="grey"/>          
          </IconButton>
        </Grid>
      </Grid>
        <span>{location}</span>
      <Grid container spacing={2}>
        {data.map((d, i) => (

          <div className="weatherCard" key={d.number}>
          <p>{d.name}</p>
          <h1 >{d.temperature}°{d.temperatureUnit}</h1>

          </div>
        ))    
        }
      </Grid>
      {data.map((d) => {
          <span>{d.number.toString()}</span>
        })}
    </main>
  );
}
