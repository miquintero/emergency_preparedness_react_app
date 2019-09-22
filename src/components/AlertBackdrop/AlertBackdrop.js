import React, { useEffect, useState } from 'react'

import dataRequests from '../../utils/DataRequests';
import Header from '../../components/Header/Header';
import { AlertContainer, EmergencyContainer, LogoContainer, IconOne, IconTwo, City, AlertTitle, List, ExpirationTitle, EmergencyTitle, Spacer } from './StyleAlertBackdrop.js';

import Clock from '../../assets/clock.png';
import Water from '../../assets/Water.png';
import Flood from '../../assets/flood.png';
import Earthquake from '../../assets/Earthquake.png';
import Wildfire from '../../assets/Wildfire.png';
import Volcano from '../../assets/Volcano.png';
import Tornado from '../../assets/Tornado.png';
import Apocalypse from '../../assets/apocalypse.png';

import './list.css';

const icons = {
  'flood': Flood,
  'tsunami': Water,
  'earthquake': Earthquake,
  'wildfire': Wildfire,
  'volcanic eruption': Volcano,
  'tornado': Tornado, 
  'apocalypse': Apocalypse
}

function AlertBackdrop ({ match }) {

  const [alertTitle, setAlertTitle] = useState('');
  const [alertDescription, setAlertDescription] = useState('');
  const [alertLevel, setAlertLevel] = useState('');
  const [expirationTime, setExpirationTime] = useState('');
  const [emergencyTypeAlert, setEmergencyTypeAlert] = useState('');
  const [emergecyTypePreparations, setEmergencyTypePreparations] = useState('');

  const [preparationsList, setPreparationsList] = useState([]);

  const {
    params: { city }
  } = match;

  useEffect(() => {
    getAlertDetails();
    getPreparations(emergencyTypeAlert); 
  }, []);


  const getAlertDetails = async (city) => {
    await dataRequests
      .fetchAlert(city)
      .then(data => {
        setAlertTitle(data.title);
        setAlertDescription(data.description);
        setEmergencyTypeAlert(data.type);
        setAlertLevel(data.severity);
        setExpirationTime(data.expires);
      })
      .catch(error => console.log('Error:', error));
  }

  const getPreparations = async (disaster) => {
    await dataRequests
      .fetchPreparations(disaster)
      .then(data => {
        console.log('my info:', data); 
        setEmergencyTypePreparations(data.emergency);
        setPreparationsList(data.list);
        })
      .catch(error => console.log('Error:', error));
  }

  const emergencyItems = 
    preparationsList.map(item => (
      <li key={item} className="prep">{item}</li>
    ));

  return (
    <AlertContainer className="preload" style={{height: '100%'}}>
      <Header emergencyTypeAlert={emergencyTypeAlert} /> 
      <EmergencyTitle>
        <City>{`${city.charAt(0).toUpperCase()}${city.slice(1)}`}</City>
        <br/>prepare for {emergencyTypeAlert}
      </EmergencyTitle>
      <EmergencyContainer>
        <IconOne src={icons[emergencyTypeAlert]}/>
        <Spacer/>
        <AlertTitle>{alertTitle.toUpperCase()}</AlertTitle>
      </EmergencyContainer>
      <LogoContainer>
        <ExpirationTitle>Alert expiration:<br/>{expirationTime}</ExpirationTitle>
      </LogoContainer>
      <List>
        {emergencyItems}
      </List>  
    </AlertContainer>
  )
}

export default AlertBackdrop;