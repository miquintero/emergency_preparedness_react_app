import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const AlertContainer = styled.div`
  border: 1px solid #ffc145;
  padding: 5px;
  border-radius: 5px;
`;

const AlertButton = styled.div`
  background-color:#ffc145;
	-moz-border-radius:5px;
  /* -webkit-border-radius:5px;
  -webkit-box-shadow: 0px 10px 41px -5px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 10px 41px -5px rgba(0, 0, 0, 1); */
  /* box-shadow: 0px 10px 41px -5px rgba(0, 0, 0, 1); */
	border-radius:5px;
	border:1px solid #223127;
	display:inline-block;
	cursor:pointer;
	color:#223127;
	font-family:Arial;
	font-size:16px;
  padding:8px 16px;
  margin-bottom: 10px;
  text-decoration:none;
  font-weight: 500;
	text-shadow:0px 1px 0px #2f6627;
`;

const AlertText = styled.div`
  font-size: 18px;
  margin: 15px;
  color: #1e3c35;
`;

export class AlertGeneral extends Component {
  render () {
    const { 
      listCity, 
      alertCity, 
      emergencyType
    } = this.props;
    return (
      <AlertContainer>
        { alertCity && alertCity === listCity ?
          <div>
            <AlertText>
              {`Weather alert for ${(listCity).toUpperCase()}`} 
            </AlertText>
            <AlertButton className='alertbutton'>
              <Link to={{
                pathname: `/alerts/${listCity}`,
                state: emergencyType
              }}>
                Get more information
              </Link>
            </AlertButton>
          </div> 
          :  
          <div>
            <AlertText>
              Good news! There are currently no weather alerts in your area.
            </AlertText>
            <AlertButton className='alertbutton'>
              <Link to='/disaster'>
                In case of future alerts
              </Link>
            </AlertButton>
          </div>
        }
      </AlertContainer>
      )
    }
  }

export default AlertGeneral;