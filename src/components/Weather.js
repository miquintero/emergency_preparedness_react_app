import React, { Component } from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import AlertGeneral from '../containers/AlertGeneral/AlertGeneral';
import FetchWeather from '../services/FetchWeather';

//for time: time.slice(14,19)

const weatherUrl = 'http://localhost:4001'

export class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameCity: '',
      forecast: [],
      alertCity: '',
      listCity: '',
      alertTitle: '',
      alertDescription: ''
    }
  }

  componentDidMount() {
    this.getWeather();
    this.getCity();
  } 
  
  getWeather = async () => {
    const city = this.state.nameCity === '' || this.state.nameCity === undefined ?
      'Barcelona' : this.state.nameCity;
    this.setState({nameCity: city});
    const generalWeather = await FetchWeather
      .apiRequest({ city })
      .catch(error => console.log(error));
    this.setState({forecast: generalWeather});
  }

  getCity = async () => {
    await axios({
      method: 'get', 
      url: `${weatherUrl}/alerts/:city`,
      'content-type': 'application/json'
    })
    .then(alerts => {
      const city = alerts.data.city;
      const lcCity = city.toLowerCase();
      this.setState({listCity: lcCity});
    })
    .catch(error => console.log('Error:', error));
  }

  handleChange = event => {
    const input = (event.target.value).toLowerCase();
    this.setState({nameCity: input});
  }

  handleSubmit = event => {
    event.preventDefault();
    this.getWeather();
    this.getCity();
    this.setState({alertCity: this.state.nameCity});
    this.setState({nameCity: ''});
  }
    
  render() {
    const { forecast } = this.state;    
    return (
      <div className="weather">
        <p>Hey there! It's {new Date().toLocaleDateString('en-us',  {weekday: 'long' })}</p>
        <div className="form">
          <form >
            <input 
              className="city" type="text" 
              onChange={this.handleChange} 
              value={this.state.nameCity} 
              placeholder="Type a city name" 
            />
            <input className="input" onClick={this.handleSubmit} type="submit"/>
          </form>
        </div>
        <p className="title">
          {forecast[0]}<br/>
          {forecast[1]} | {forecast[2]} 
        </p>
        <AlertGeneral  region={this.state.forecast[1]} 
          nameCity={this.state.nameCity} 
          alertCity={this.state.alertCity} 
          listCity={this.state.listCity} 
        />
        <p className="temperature"> {forecast[10]}°C</p>
        <Moment className="time">
          {forecast[7]}
        </Moment>          
        <div className="conditions">
          <img className="icon" alt="icon of weather conditions" src={forecast[32]}/>
          <p className="summary">
            The day is<br/>
            {forecast[31]}.
          </p>
        </div>   
      </div>
    )
  }
}

export default Weather;