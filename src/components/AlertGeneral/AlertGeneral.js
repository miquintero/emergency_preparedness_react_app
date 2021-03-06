import React, { Component } from 'react';

import { AlertContainer, AlertButton, AlertText, Icon, StyledLink } from './StyleAlertGeneral';

import emergency from '../../assets/emergency.png';
import alert from '../../assets/alert.png';
import warning from '../../assets/warning.png';

const icons = {
  'warning': emergency,
  'alert': alert,
  'watch': warning,
}

export class AlertGeneral extends Component {

  render () {

    const { 
      alertCity, 
      dbCity, 
      emergencyType, 
      severity
    } = this.props;
    return (
      <AlertContainer>
        { (dbCity && alertCity === dbCity) ?
          <div>
            <Icon alt="icon of emergency condition" src={icons[severity]}/>
            <AlertText>
              {`Weather alert for ${(dbCity).toUpperCase()}`} 
            </AlertText>
            <AlertButton className='alertbutton'>
              <StyledLink to={{ 
                pathname: `/alerts/${dbCity}`, 
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
              <StyledLink to={{
                pathname:`/disaster/${emergencyType}`
              }}>
                In case of future alerts
              </StyledLink>
            </AlertButton>
          </div>
        }
      </AlertContainer>
    )
  }
};

export default AlertGeneral;