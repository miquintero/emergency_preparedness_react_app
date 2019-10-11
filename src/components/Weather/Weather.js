import React, { useState, useEffect } from "react";
import Moment from 'react-moment';

import dataRequests from '../../utils/DataRequests';
import usePrevious from '../../utils/CompareHook';
import AlertGeneral from '../AlertGeneral/AlertGeneral';

import { Wrapper, WeekDay, Logo, FormContainer, InputForm, UserInput, SubmitButton, City, Region, Temperature, Degrees, Time, ConditionsContainer, Icon, Summary } from './StyleWeather';
import LogoImg from '../../assets/listo_transp.png'

function Weather () {

  const [nameCity, setNameCity] = useState('');
  const [forecast, setForecast] = useState([]);
  const [emergencyType, setEmergencyType] = useState('');
  const [alertCity, setAlertCity] = useState('');
  const [listCity, setListCity] = useState('');
  const [severity, setSeverity] = useState('');

  const getWeather = async () => {
    const city = nameCity || 'Barcelona';
    setNameCity(city);
    await dataRequests
      .fetchWeather({city})
      .then(weather => setForecast(weather))
      .catch(error => console.log('Error:', error));
  }

  const getCity = async (nameCity) => {
    await dataRequests
      .fetchCity(nameCity)
      .then(response => {
        const data = response.data;
        setListCity(data.city);
        setEmergencyType(data.type);
        setSeverity(data.severity) 
      })
      .catch(error => console.log('Error:', error));
  }
  
  const handleChange = event => {
    const input = (event.target.value).toLowerCase();
    setNameCity(input);
  }

  const handleSubmit = event => {
    event.preventDefault();
    getWeather();
    getCity();
    setAlertCity(nameCity);
    setNameCity('');
  }

  const prevSearch = usePrevious(alertCity);

  useEffect(() => {
    getWeather();
    if (prevSearch !== alertCity) {
      getCity(alertCity);
    }
  }, []);
       
  return (
    <Wrapper className="weather">
      <WeekDay><p>{new Date().toLocaleDateString('en-us',  {weekday: 'long' })}</p></WeekDay>
      <Time><Moment className="time" format='HH:mm'>{forecast[7]}</Moment></Time>          
      <Logo><img src={LogoImg} width="160" alt="logo that says Listo"/></Logo>
      <FormContainer>
        <InputForm>
          <UserInput 
            type="text" 
            value={nameCity} 
            onChange={handleChange} 
            placeholder="Type a city name" 
          />
          <SubmitButton onClick={handleSubmit} type="submit"/>
        </InputForm>
      </FormContainer>
      <City>{forecast[0]}</City>
      <Region>{forecast[1]} | {forecast[2]}</Region>
      <AlertGeneral  region={forecast[1]} 
        nameCity={nameCity} 
        alertCity={alertCity} 
        listCity={listCity} 
        emergencyType={emergencyType}
        severity={severity}
      />
      <Temperature> {forecast[10]}<Degrees>°C</Degrees></Temperature>
      <ConditionsContainer>
        <Summary>The weather is<br/>{forecast[31]}</Summary>
        <Icon alt="icon of weather conditions" src={forecast[32]}/>
      </ConditionsContainer>   
    </Wrapper>
  );
}

export default Weather;