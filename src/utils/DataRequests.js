import axios from 'axios';

const GEOCODE_KEY = process.env.REACT_APP_GEOCODE_KEY;
const WEATHER_KEY = process.env.REACT_APP_WEATHER_KEY;

const googleUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='
const darkskyUrl = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/';
const weatherUrl = `http://localhost:${process.env.REACT_APP_PORT}`

const dataRequests = {

  getHeaders() {
    return {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  },

  geoCoding({ address } = {}) {
    return axios.get(
      `${googleUrl}${address}&key=${GEOCODE_KEY}`,
      this.getHeaders()
    )
    .then(response => {
      const results = response.data.results[0];
      const coords = results.geometry.location;
      return coords;
    })
  },
  
  fetchWeather({ lat, lng } = {}) {
    return axios.get(
      `${darkskyUrl}${WEATHER_KEY}/${lat},${lng}`,
      this.getHeaders()
    )
  }, 

  fetchCity ({ city } = {}) {
    return axios.get(
      `${weatherUrl}/alerts/${city}`,
      this.getHeaders()
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