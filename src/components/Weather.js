import React, { Component } from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import styled from 'styled-components'

import AlertGeneral from '../containers/AlertGeneral/AlertGeneral';
import FetchWeather from '../services/FetchWeather';

import LogoImg from '../assets/listo_transp.png'

const weatherUrl = 'http://localhost:4004'

const Wrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  `;

const WeekDay = styled.div`
  font-size: 22px;
  align-self: flex-end;
  margin-left: 60px;
  margin-top: 20px;
  color: #4E5166;

`;

const Logo = styled.div`
  margin-top: 5px;
  align-self: flex-start;
  z-index: 2;
  position: absolute;
`;

const FormContainer = styled.div`
  top: 180px;
  z-index: 1;
  position: absolute;
  justify-content: center;
`;

const InputForm = styled.form`
  display: flex;
  margin-top: -30px;
  width: 60vw; 
  align-content: center;
  margin-bottom: 30px;

`;

const UserInput = styled.input`
  align-content: space-between;
  margin-top: 5px;
  margin-left: 60px;
  width: 260px;
  padding: 3px;
  font-size: 20px;
  border-width: 1.5px;
  border-color: #92c8a0;
  background-color: none;
  color: #4E5166;
  border-style: solid;
  border-radius: 5px;
  text-shadow: -50px 0px 1px rgba(66,66,66,.0);
  -webkit-box-shadow: 0px 10px 21px -5px rgba(0, 0, 0, 1);

`;

const SubmitButton = styled.input`
  margin-top: 5px;
  align-content: space-between;
  font-size: 6px;
  color: #ffc145e3;
  background-color: #ffc145e3;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  -webkit-box-shadow: 0px 10px 21px -5px rgba(0, 0, 0, 1);

  /* border: solid 10px white; */
`;

const City = styled.p`
  margin-top: 80px;
  font-size: 36px;
  font-weight: bold;
  color: #223127;
  font-weight: 700;
  text-shadow: -2px 4px 9px rgba(68,68,68,0.76);
`;

const Region = styled.p`
  margin-top: -38px;
  /* align-self: flex-end; */
  font-size: 18px;
  font-weight: bold;
  color: #4E5166;
  font-weight: 700;
  text-shadow: -50px 0px 1px rgba(66,66,66,.0);
 
`;

const Temperature = styled.div`
  font-size: 60px;
  margin-top: 10px;
  color: #4E5166;
  display: flex;
  justify-content:center;
  height: 130px;
  text-shadow: -2px 4px 9px rgba(68,68,68,0.76);

`;

const Degrees = styled.div`
  color: #FF9F1c;
  font-size: 40px;
`;

const Time = styled.div`
  font-size: 22px;
  align-self: flex-end;
  margin-left: 60px;
  margin-top: -20px;
`;

const ConditionsContainer = styled.div`
  margin-top: -40px;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  border: 1px solid #ffc145e3;
  background-color: #4E5166;
  border-radius: 5px;
  -webkit-box-shadow: 0px 10px 21px -5px rgba(0, 0, 0, 1);
`;

const Icon = styled.img`
  width: 100px;
`;

const Summary = styled.p`
  margin: 20px;
  font-size: 22px
`;

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
        <Logo><img src={LogoImg} width="160"/></Logo>
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