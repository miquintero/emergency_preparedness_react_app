import React, { Component } from 'react';
import axios from 'axios';
import ClearSky from '../assets/Clear.svg';

const WEATHER_KEY = process.env.REACT_APP_WEATHER_KEY;
const weatherUrl = 'https://cors-anywhere.herokuapp.com/https://api.forecast.io/forecast/'; //prepend with heroku site so that the API works from browser

export class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alerts: [],
      currently: 'loading', 
      forecast: {}
    }
  }

  componentDidMount() {
    this.getWeather();
  }

  getWeather = (latitude, longitude) => {
    const success = position => {
      const { latitude, longitude } = position.coords;
  
      axios
        .get(`${weatherUrl}${WEATHER_KEY}/${latitude},${longitude}`)
        .then(res => res.data)
        .then(forecast => this.setState({forecast, currently: 'success'}))
        .catch(() => this.setState({currently: 'error'}))
    }
    const error = () => {
      alert('Cannot retrieve the weather for this location.');
    }
    navigator.geolocation.getCurrentPosition(success, error); //method to get current position of device   
  } 

  render() {
    const { currently, forecast } = this.state;
    return (
      <div>
        {currently === 'loading' ? (
          <p>Loading...</p>
        ) : currently === 'error' ?  (
          <p>There was an error</p>
        ) : (
          <div>
            <p>Hey! It's {new Date().toLocaleDateString('en-us',  {weekday: 'long' })}</p>
            <p>The sky is {forecast.currently.summary}</p>
            <p>The current temperature is: {forecast.currently.temperature}</p>
            <img src={ClearSky} alt='icon of weather'></img>
            <p></p>
          </div>
        )}
      </div>
    )
  }
}

export default Weather;


