import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';

import dataRequests from '../../utils/DataRequests';
import usePrevious from '../../utils/CompareHook';
import AlertGeneral from '../AlertGeneral/AlertGeneral';
import ClimateIcons from './ClimateIcons';

import { Wrapper, WeekDay, Logo, FormContainer, InputForm, UserInput, SubmitButton, City, Region, Temperature, Degrees, Time, ConditionsContainer, Summary } from './StyleWeather';
import LogoImg from '../../assets/listo_transp.png';

function Weather () {

  const [nameCity, setNameCity] = useState('');
  const [coordinates, setCoords] = useState({ 'lat': 0, 'lng': 0 });
  const [temperature, setTemperature] = useState(0);
  const [currentSummary, setCurrent] = useState('');
  const [hourlySummary, setHourly] = useState('');
  const [time, setTime] = useState('');
  const [darkskyIcon, setDarksky] = useState('');
  const [emergencyType, setEmergencyType] = useState('');
  const [alertCity, setAlertCity] = useState('');
  const [dbCity, setDbCity] = useState('');
  const [severity, setSeverity] = useState('');

  const getCoords = async () => {
    const address = nameCity || 'Santiago';
    setNameCity(address);
    await dataRequests
      .geoCoding({ address })
      .then(coords => setCoords(coords))
      .catch(error => console.log('Error:', error));
  }
  
  const getWeather = async () => {
    const lat = coordinates.lat;
    const lng = coordinates.lng;
    await dataRequests
      .fetchWeather({ lat, lng })
      .then(weather => {
        const data = weather.data.currently;
        setTemperature(data.temperature);
        setCurrent(data.summary);
        setTime(data.time);
        setHourly(weather.data.hourly.summary);
        setDarksky(data.icon);
      })
      .catch(error => console.log('Error:', error));
  }
    
    const getAlert = async () => {
      const city =  nameCity || 'Santiago';
      await dataRequests
      .fetchAlert({city})
      .then(alerts => {
        setDbCity(alerts.city);
        setEmergencyType(alerts.type);
        setSeverity(alerts.severity);
      })
      .catch(error => console.log('Error:', error));
  }

  const handleChange = event => {
    const input = (event.target.value).toLowerCase();
    setNameCity(input);
  }

  const handleSubmit = event => {
    event.preventDefault();
    getCoords();
    getWeather();
    setAlertCity(nameCity);
    getAlert();
    setNameCity('');
    setDarksky('');
  }

  const prevSearch = usePrevious(alertCity);

  useEffect(() => {
    getCoords();
    if (coordinates !== { 'lat': 0, 'lng': 0 }) getWeather();
    if (prevSearch !== alertCity) getCoords(alertCity);
    getAlert();
  }, []);
       
  return (
    <Wrapper className="weather">
      <WeekDay><p>{new Date().toLocaleDateString('en-us',  {weekday: 'long' })}</p></WeekDay>
      <Time><Moment className="time" format='h:mm a'>{time}</Moment></Time>          
      <Logo><img src={LogoImg} width="160" alt="logo for Listo"/></Logo>
      <FormContainer>
        <InputForm>
          <UserInput 
            type="text" 
            value={nameCity} 
            onChange={handleChange} 
            placeholder="Type your location" 
          />
          <SubmitButton onClick={handleSubmit} type="submit"/>
        </InputForm>
      </FormContainer>
      <City>{nameCity ? nameCity : alertCity}</City> 
      <Region>{hourlySummary}</Region>
      <AlertGeneral 
        alertCity={alertCity} 
        dbCity={dbCity} 
        emergencyType={emergencyType}
        severity={severity}
      /> 
      <Temperature>{temperature}<Degrees>°C</Degrees></Temperature>
      <ConditionsContainer>
        <Summary>The current weather is {currentSummary.toLowerCase()}</Summary>
        <ClimateIcons 
          darkskyIcon={darkskyIcon}
        />
      </ConditionsContainer>    
    </Wrapper>
  );
}

export default Weather;