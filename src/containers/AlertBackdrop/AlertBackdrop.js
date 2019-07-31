import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import Header from '../Header/Header';
import SideBar from '../Sidebar/Sidebar';

import './list.css';

import Clock from '../../assets/clock.png';
import Water from '../../assets/Water.png';
import Flood from '../../assets/flood.png';
import Earthquake from '../../assets/Earthquake.png';
import Wildfire from '../../assets/Wildfire.png';
import Volcano from '../../assets/Volcano.png';
import Tornado from '../../assets/Tornado.png';
import Apocalypse from '../../assets/apocalypse.png';

const icons = {
  'flood': Flood,
  'tsunami': Water,
  'earthquake': Earthquake,
  'wildfire': Wildfire,
  'volcanic eruption': Volcano,
  'tornado': Tornado, 
  'apocalypse': Apocalypse
}

const serverUrl = 'http://localhost:4004';

const AlertContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* position: fixed; */
  /* width: 100%; */
  /* height: 100%; */
  /* top: 0;
  left: 0; */
`;

const EmergencyContainer = styled.div`
  display: flex;
  width: 76%;
  align-content: center;
  margin: 20px 50px 30px 22px;
  /* margin-top: -180px; */
  -webkit-box-shadow: 0px 10px 41px -5px rgba(0, 0, 0, 1);
  padding-right: 10px;
  border-radius: 5px;
  background-color: white;
`;

const LogoContainer = styled.div`
  display: flex;
  width: 80%;
  margin-left: 20px;
  border-radius: 5px;
  justify-content: center;  /* margin-left: 60px; */
  margin-bottom: 20px;
  background-color: #4E5166;
  padding-top: 10px;
  -webkit-box-shadow: 0px 10px 41px -5px rgba(0, 0, 0, 1);

`;

const IconOne = styled.img`
  margin-top: 40px;
  margin-left: 20px;
  /* display: inline-block; */
  height: 80px;
  flex: 1;
`;

const IconTwo = styled.img`
  margin-left: 20px;
  /* display: inline-block; */
  height: 50px;
`;

const City = styled.p`
  color: #223127;
  font-size: 40px;
  margin-bottom: -50px;
  font-weight: 800;
  text-shadow: -50px 0px 1px rgba(66,66,66,.0);
`;

const AlertTitle = styled.p`
  /* margin-top: -100px; */
  font-size: 20px;
  margin-left: 20px;
  padding-right: 20px;
  color: #4E5166;
  font-weight: 600;
  flex: 2;
`;

// const Description = styled.div`
//   margin-bottom: 20px;
// `;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 80%;
  margin-top:200px;
  margin-left: 20px;
`;

const ExpirationTitle = styled.div`
  font-size: 18px;
  margin-bottom: 14px;
  font-weight: 600;
  color: #223127;
`;

const EmergencyTitle = styled.div`
  font-size: 30px;
  /* margin-top: 30px; */
  text-align: center;
  margin-bottom: -5px;
  color: red;
  font-weight: 500;
  `;

const Spacer = styled.div`
  flex: 1;
  width: 30px;
`;


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
    // this.setState({city: this.props.city})
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
    return await axios({
      method: 'get', 
      url: `${serverUrl}/alerts/${city}`,
      'content-type': 'application/json'
    })
    .then(({ data }) => {
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
      {/* <Description className="description">{alertDescription}</Description> */}
        <LogoContainer>
          <ExpirationTitle>Alert expiration:<br/>{expirationTime}</ExpirationTitle>
          <IconTwo src={Clock} onClick={console.log('click')} onClick={this.props.clickBackdrop}/>
        </LogoContainer>
        <List>
          {emergencyItems}
        </List>  
        <script> </script>

      </AlertContainer>
     )
  }
}

export default AlertBackdrop
