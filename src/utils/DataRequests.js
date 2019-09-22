import axios from 'axios';

const WEATHER_KEY = process.env.REACT_APP_WEATHER_KEY;
const apiUrl = 'https://api.apixu.com/v1/current.json?key=';
const weatherUrl = `http://localhost:${process.env.REACT_APP_PORT}`
const serverUrl = 'http://localhost:4004';

const dataRequests = {

  fetchWeather({ city } = {}) {
    return axios({
      method: 'get',
      url:`${apiUrl}${WEATHER_KEY}&q=${city}`,
      'content-type': 'application/json',
    })
    .then(response => {
      const currentLocation = [];
      const currentWeather = [];
      const currentCondition = [];
      for (let key in response.data.location) {
        currentLocation.push(response.data.location[key]);
      }
      for (let key in response.data.current) {
        currentWeather.push(response.data.current[key]);
      }
      for (var key in response.data.current.condition) {
        currentCondition.push(response.data.current.condition[key]);
      }
      const generalWeather = [...currentLocation, ...currentWeather, ...currentCondition];
      return generalWeather;
    })
  }, 

  fetchCity ({ city } = {}) {
    return axios({
      method: 'get', 
      url: `${weatherUrl}/alerts/${city}`,
      'content-type': 'application/json'
    })
    .then(alerts => {
      const lcCity = alerts;
      return lcCity;
    })
  }, 

  fetchAlert ({ city } = {}) {
    return axios({
      method: 'get', 
      url: `${serverUrl}/alerts/${city}`,
      'content-type': 'application/json'
    })
    .then(({ data }) => {
      const alert = data;
      return alert;
    })
  }, 

  fetchPreparations ({ disaster } = {}) {
    return axios({
      method: 'get', 
      url: `${serverUrl}/disaster/${disaster}`,
      'content-type': 'application/json'
    })
    .then(({ data }) => {
      const preparations = data;
      return preparations;
    })
  }, 

  fetchSuggestions ({ disaster } = {}) {
    return axios({
      method: 'get',
      url: `${serverUrl}/disaster/${disaster}`,
      'content-type': 'application/json'
    })
      .then(({ data }) => {
        const suggestions = data;
        return suggestions;
      })
  }
}

export default dataRequests;