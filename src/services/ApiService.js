import axios from 'axios';
import Geocode from 'react-geocode';

const WEATHER_KEY = process.env.REACT_APP_WEATHER_KEY;
const COORD_KEY = process.env.REACT_APP_COORD_KEY;
const weatherUrl = 'https://cors-anywhere.herokuapp.com/https://api.forecast.io/forecast/'; //prepend with heroku site so that the API works from browser
  
export default {

  // getLocation: () => {
  //   return getCoord('30305')
  // }

  // const getCoord = (inputZip) => {

  //   Geocode.setApiKey(WEATHER_KEY);

  //   Geocode.fromAddress(inputZip).then(
  //     response => {
  //       const { lat, lng } = response.results[0].geometry.location;
  //       console.log(lat, lng);
  //     },
  //     error => {
  //       console.error(error);
  //     }
  //   );
  // };

  // const getWeather = (latitude, longitude) => {
  //   const success = position => {
  //     const { latitude, longitude } = position.coords;
  
  //     axios
  //       .get(`${weatherUrl}${WEATHER_KEY}/${latitude},${longitude}`)
  //       .then(res => res.data)
  //       .then(forecast => this.setState({forecast, currently: 'success'}))
  //       .catch(() => this.setState({currently: 'error'}))
  //   }
  //   const error = () => {
  //     alert('Cannot retrieve the weather for this location.');
  //   }
  //   navigator.geolocation.getCurrentPosition(success, error); //method to get current position of device   
  // }  
};




