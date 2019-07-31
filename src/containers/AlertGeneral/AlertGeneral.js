import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

import emergency from '../../assets/emergency.png';
import alert from '../../assets/alert.png';
import warning from '../../assets/warning.png';

const icons = {
  'warning': emergency,
  'alert': alert,
  'watch': warning
}

const AlertContainer = styled.div`
  border: 1px solid #FF9F1C;
  padding: 5px;
  border-radius: 5px;
  -webkit-box-shadow: 0px 10px 21px -5px rgba(0, 0, 0, 1);
  background-color: white;
`;

const Icon = styled.img`
  width: 100px;
`;

const AlertButton = styled.div`
  background-color:#ffc145;
	-moz-border-radius:5px;
  -webkit-border-radius:5px;
	border-radius:5px;
	border:1px solid #223127;
	display:inline-block;
	cursor:pointer;
	color:#223127;
	font-family:Arial;
	font-size:16px;
  padding:8px 16px;
  margin-top: -10px;
  margin-bottom: 10px;
  text-decoration:none;
  font-weight: 500;
  text-shadow:0px 1px 0px #2f6627;
  font-family: 'Darker Grotesque', sans-serif;
`;

const AlertText = styled.div`
  margin-top: -20px;
  font-size: 18px;
  margin: 20px;
  color: red;
  font-weight: 800
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`;

export class AlertGeneral extends Component {
  render () {
    const { 
      listCity, 
      alertCity, 
      emergencyType, 
      severity
    } = this.props;
    return (
      <AlertContainer>
        { alertCity && alertCity === listCity ?
          <div>
            <Icon alt="icon of emergency condition" src={icons[severity]}/>
            <AlertText>
              {`Weather alert for ${(listCity).toUpperCase()}`} 
            </AlertText>
            <AlertButton className='alertbutton'>
              <StyledLink to={{
                pathname: `/alerts/${listCity}`,
                state: emergencyType
              }}>
                Get more information
              </StyledLink>
            </AlertButton>
          </div> 
          :  
          <div>
            <AlertText>
              Good news!<br/>There are currently no weather alerts in your area.
            </AlertText>
            <AlertButton className='alertbutton'>
              <StyledLink to='/disaster'>
                In case of future alerts
              </StyledLink>
            </AlertButton>
          </div>
        }
      </AlertContainer>
      )
    }
  }

export default AlertGeneral;