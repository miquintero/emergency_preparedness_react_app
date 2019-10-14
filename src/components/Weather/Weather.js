import React, { useState, useEffect } from "react";
import Moment from 'react-moment';

import dataRequests from '../../utils/DataRequests';
import usePrevious from '../../utils/CompareHook';
import AlertGeneral from '../AlertGeneral/AlertGeneral';

import { Wrapper, WeekDay, Logo, FormContainer, InputForm, UserInput, SubmitButton, City, Region, Temperature, Degrees, Time, ConditionsContainer, Icon, Summary } from './StyleWeather';

import LogoImg from '../../assets/listo_transp.png';
import CLEAR_DAY from '../../assets/climate-icons/clear-day.svg';
import CLEAR_NIGHT from '../../assets/climate-icons/clear-night.svg';
import CLOUDY from '../../assets/climate-icons/cloudy.svg';
import FOG from '../../assets/climate-icons/fog.svg';
import PARTLY_CLOUDY_DAY from '../../assets/climate-icons/partly-cloudy-day.svg';
import PARTLY_CLOUDY_NIGHT from '../../assets/climate-icons/partly-cloudy-night.svg';
import RAIN from '../../assets/climate-icons/rain.svg';
import SLEET from '../../assets/climate-icons/sleet.svg';
import SNOW from '../../assets/climate-icons/snow.svg';
import WIND from '../../assets/climate-icons/wind.svg';

const climateIcons = {
  'clear-day': CLEAR_DAY, 
  'clear-night': CLEAR_NIGHT, 
  'cloudy': CLOUDY, 
  'fog': FOG, 
  'partly-cloudy-day': PARTLY_CLOUDY_DAY,
  'partly-cloudy-night': PARTLY_CLOUDY_NIGHT, 
  'rain': RAIN, 
  'sleet': SLEET, 
  'snow': SNOW, 
  'wind': WIND,
};

function Weather () {

  const [nameCity, setNameCity] = useState('');
  const [coordinates, setCoords] = useState({ 'lat': 0, 'lng': 0 });
  const [temperature, setTemperature] = useState(0);
  const [currentSummary, setCurrent] = useState('');
  const [hourlySummary, setHourly] = useState('');
  const [time, setTime] = useState('');
  const [darkskyIcon, setDarksky] = useState('');
  const [emergencyAlert, setAlert] = useState('');
  const [emergencyType, setEmergencyType] = useState('');
  const [alertCity, setAlertCity] = useState('');
  const [listCity, setListCity] = useState('');
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
        if (weather.data.alerts) {
          setAlert(weather.data.alerts);
        }
      })
      .catch(error => console.log('Error:', error));
  }

  const getCity = async (nameCity) => {
    await dataRequests  
      .fetchCity(nameCity)
      .then(response => {
        setListCity(response.data.city);
        setEmergencyType(response.data.type);  
        setSeverity(response.data.severity);
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
    getCity(nameCity);
    setAlertCity(nameCity);
    setNameCity('');
    setDarksky('');
  }

  const prevSearch = usePrevious(alertCity);
  
  const LoadingIcon = 
    !darkskyIcon 
    ? 'Loading icon'
    : <Icon src={climateIcons[darkskyIcon]} alt="icon of weather conditions"/>;

  useEffect(() => {
    getCoords();
    if (coordinates !== { 'lat': 0, 'lng': 0 }) getWeather();
    getCity(nameCity);
    if (prevSearch !== alertCity) getCoords(alertCity);
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
        emergencyAlert={emergencyAlert} 
        alertCity={alertCity} 
        listCity={listCity} 
        emergencyType={emergencyType}
        severity={severity}
      /> 
      <Temperature>{temperature}<Degrees>°C</Degrees></Temperature>
      <ConditionsContainer>
        <Summary>The current weather is {currentSummary.toLowerCase()}</Summary>
        {LoadingIcon}
      </ConditionsContainer>    
    </Wrapper>
  );
}

export default Weather;