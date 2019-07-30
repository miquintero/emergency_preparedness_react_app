import React, { Component } from 'react'
import axios from 'axios';
import styled from 'styled-components'

import './list.css';

import Thermometer from '../../assets/flood.png';

const serverUrl = 'http://localhost:4001';
// const { city } = this.props.match.params;

const AlertContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmergencyContainer = styled.div`
  display: flex;
`;

const EmergencyTitle = styled.p`
  font-size: 30px;
  margin-top: 30px;
  text-align: center;
`;

const Icon = styled.img`
  margin-top: -20px;
  display: inline-block;
`;

const AlertTitle = styled.p`
  margin-top: -10px;
  font-size: 20px;
  margin-left: 20px;
`;

const ExpirationTitle = styled.div`
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 14px;
  text-align: center;
  font-weight: 600;
`;

const Description = styled.div`
  margin-bottom: 20px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 300px;
  margin-top:200px;
`;

export class AlertDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      alertTitle: '', 
      alertDescription: '',
      alertLevel: '',
      expirationTime: '',
      emergencyTypeAlert: '',
      emergencyTypePreparations: '',
      preparationsList: []
    }
  }

  componentDidMount() {
    this.getAlertDetails(this.props.match.params.city)
      .then(() => 
        this.getPreparations(this.state.emergencyTypeAlert)
      );
  }

  getAlertDetails = async (city) => {
    return await axios({
      method: 'get', 
      url: `${serverUrl}/alerts/${city}`,
      'content-type': 'application/json'
    })
    .then(({ data }) => {
      // console.log(data);
      //add in the alert, watch, and warning icons
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
    await axios({
      method: 'get', 
      url: `${serverUrl}/disaster/${disaster}`,
      'content-type': 'application/json'
    })
    .then(({ data }) => {
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
      emergencyTypePreparations, 
      preparationsList,
      alertTitle,
      alertDescription,
      expirationTime
    } = this.state;
    const { city } = this.props.match.params;
    const emergencyItems = 
      preparationsList
        .map(item => 
        <li key={item} className="prep">
          {item}
        </li>
      )
    return (
      <AlertContainer>
        <EmergencyTitle>
          {`${(city).charAt(0).toUpperCase()}${(city).slice(1)}`}<br/>prepare for a {(emergencyTypeAlert).toLowerCase()}
        </EmergencyTitle>
        <EmergencyContainer>
          <Icon className="icon" width="80"src={Thermometer}/>
          <AlertTitle>{alertTitle}</AlertTitle>
        </EmergencyContainer>
        <ExpirationTitle>Alert expiration:<br/>{expirationTime}</ExpirationTitle>
        <Description className="description">{alertDescription}</Description>
        <List>
          {emergencyItems}
        </List>  
      </AlertContainer>
    )
  }
}

export default AlertDetails;