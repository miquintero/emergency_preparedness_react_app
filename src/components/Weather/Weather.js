import React, { Component } from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import AlertGeneral from '../AlertGeneral/AlertGeneral';
import FetchWeather from '../../services/FetchWeather';

import { Wrapper, WeekDay, Logo, FormContainer, InputForm, UserInput, SubmitButton, City, Region, Temperature, Degrees, Time, ConditionsContainer, Icon, Summary } from './StyleWeather';
import LogoImg from '../../assets/listo_transp.png'

const weatherUrl = 'http://localhost:4004'

export class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameCity: '',
      forecast: [],
      emergencyType: '',
      alertCity: '',
      listCity: '',
      alertTitle: '',
      alertDescription: '',
      severity: ''
    }
  }

  componentDidMount() {
    this.getWeather();
  } 
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.alertCity !== this.state.alertCity) {
      this.getCity(this.state.alertCity);
    }
  }
  
  getWeather = async () => {
    const city = this.state.nameCity || 'Barcelona';
    this.setState({nameCity: city});
    const generalWeather = await FetchWeather
      .apiRequest({ city })
      .catch(error => console.log(error));
    this.setState({forecast: generalWeather});
  }

  getCity = async (city) => {
    await axios({
      method: 'get', 
      url: `${weatherUrl}/alerts/${city}`,
      'content-type': 'application/json'
    })
    .then(alerts => {
      console.log(alerts);
      const lcCity = alerts.data.city;
      lcCity && this.setState({
        listCity: lcCity,
        emergencyType: alerts.data.type,
        severity: alerts.data.severity
      });
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
    this.setState({
      alertCity: this.state.nameCity,
      nameCity: ''
    });
  }
    
  render() {
    const { forecast } = this.state;    
    return (
      <Wrapper className="weather">
        <WeekDay><p>{new Date().toLocaleDateString('en-us',  {weekday: 'long' })}</p></WeekDay>
        <Time><Moment className="time" format='HH:mm'>{forecast[7]}</Moment></Time>          
        <Logo><img src={LogoImg} width="160" alt="logo that says Listo"/></Logo>
        <FormContainer>
          <InputForm>
            <UserInput 
              type="text" 
              onChange={this.handleChange} 
              value={this.state.nameCity} 
              placeholder="Type a city name" 
            />
            <SubmitButton onClick={this.handleSubmit} type="submit"/>
          </InputForm>
        </FormContainer>
        <City>{forecast[0]}</City>
        <Region>{forecast[1]} | {forecast[2]}</Region>
        <AlertGeneral  region={this.state.forecast[1]} 
          nameCity={this.state.nameCity} 
          alertCity={this.state.alertCity} 
          listCity={this.state.listCity} 
          emergencyType={this.state.emergencyType}
          severity={this.state.severity}
        />
        <Temperature> {forecast[10]}<Degrees>°C</Degrees></Temperature>
        <ConditionsContainer>
          <Summary>The weather is<br/>{forecast[31]}</Summary>
          <Icon alt="icon of weather conditions" src={forecast[32]}/>
        </ConditionsContainer>   
      </Wrapper>
    )
  }
}

export default Weather;