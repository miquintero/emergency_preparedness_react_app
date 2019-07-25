import React, { Component } from 'react';
import axios from 'axios';
import Weather from '../../components/Weather';
// import ApiService from '../../services/ApiService';

const WEATHER_KEY = process.env.REACT_APP_WEATHER_KEY;
const weatherUrl = 'https://cors-anywhere.herokuapp.com/https://api.forecast.io/forecast/'; //prepend with heroku site so that the API works from browser

export class Dashboard extends Component {


  render() {
    return (
      <div>
        <Weather />
      </div>
    )
  }
}

export default Dashboard;
