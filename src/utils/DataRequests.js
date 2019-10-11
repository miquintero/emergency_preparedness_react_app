import axios from 'axios';

const WEATHER_KEY = process.env.REACT_APP_WEATHER_KEY;
const apiUrl = 'https://api.apixu.com/v1/current.json?key=';
const weatherUrl = `http://localhost:${process.env.REACT_APP_PORT}`

const dataRequests = {

  getHeaders() {
    return {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  },

  fetchWeather({ city } = {}) {
    return axios.get(
      `${apiUrl}${WEATHER_KEY}&q=${city}`,
      this.getHeaders()
    )
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
    return axios.get(
      `${weatherUrl}/alerts/${city}`,
      getHeaders()
    )
    .then(alerts => {
      const lcCity = alerts;
      return lcCity;
    })
  }, 

  fetchAlert ({ city } = {}) {
    return axios.get(
      `${weatherUrl}/alerts/${city}`,
      this.getHeaders()
    )
    .then(({ data }) => {
      const alert = data;
      return alert;
    })
  }, 

  fetchPreparations () {
    return axios.get(
      `${weatherUrl}/disaster`,
      this.getHeaders()
    )
    .then(({ data }) => {
      const preparations = data;
      return preparations;
    })
  }, 

  fetchSuggestions ({ disaster } = {}) {
    return axios.get(
      `${weatherUrl}/disaster/${disaster}`,
      this.getHeaders()
    )
    .then(({ data }) => {
      const suggestions = data;
      return suggestions;
    })
  }
}

export default dataRequests;