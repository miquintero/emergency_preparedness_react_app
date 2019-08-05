import axios from 'axios';

const WEATHER_KEY= 
const apiUrl= 

const FetchWeather = {
  apiRequest({ city } = {}) {
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
  }
}

export default FetchWeather;