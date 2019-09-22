import React, { Component } from 'react'

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


export class AlertBackdrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertTitle: '', 
      alertDescription: '',
      alertLevel: '',
      expirationTime: '',
      emergencyTypeAlert: '',
      preparationsList: [], 
      city: '',
      sidebarOpen: false,
    }
  }

  componentDidMount() {
    this.getAlertDetails(this.props.match.params.city)
      .then(() => 
        this.getPreparations(this.state.emergencyTypeAlert)
      );
  }

  sidebarClickHandler = () => {
    this.setState((prevState) => {
      return {sidebarOpen: !prevState.sidebarOpen}
    })
  }

  backdropClickHandler = () => {
    this.setState((prevState) => {
      return {sidebarOpen: !prevState.sidebarOpen}
    })
  }

  getAlertDetails = async (city) => {
    await dataRequests
      .fetchAlert(city)
      .then(data => {
        console.log(data);
        this.setState({
          alertTitle: data.title,
          alertDescription: data.description,
          emergencyTypeAlert: data.type,
          alertLevel: data.severity,
          expirationTime: data.expires
      })
    })
    .catch(error => console.log('Error:', error));
  }

  getPreparations = async (disaster) => {
    await dataRequests
      .fetchPreparations(disaster)
      .then(data => {
        console.log('my info:', data);
        data && this.setState({
          emergencyTypePreparations: data.emergency,
          preparationsList: data.list
        });
      })
      .catch(error => console.log('Error:', error));
  }

  render() {
    const { 
      emergencyTypeAlert, 
      preparationsList,
      alertTitle,
      expirationTime
    } = this.state;
    const emergencyItems = 
      preparationsList
        .map(item => 
        <li key={item} className="prep">
          {item}
        </li>
      )
    return (
      <AlertContainer className="preload" style={{height: '100%'}}>
        <Header emergencyTypeAlert={emergencyTypeAlert} /> 
        <EmergencyTitle>
          <City>{`${(this.props.match.params.city).charAt(0).toUpperCase()}${(this.props.match.params.city).slice(1)}`}</City>
          <br/>prepare for {emergencyTypeAlert}
        </EmergencyTitle>
        <EmergencyContainer>
          <IconOne src={icons[emergencyTypeAlert]}/>
          <Spacer/>
          <AlertTitle>{alertTitle.toUpperCase()}</AlertTitle>
        </EmergencyContainer>
        <LogoContainer>
          <ExpirationTitle>Alert expiration:<br/>{expirationTime}</ExpirationTitle>
          <IconTwo src={Clock} onClick={this.props.clickBackdrop}/>
        </LogoContainer>
        <List>
          {emergencyItems}
        </List>  
      </AlertContainer>
     )
  }
}

export default AlertBackdrop;