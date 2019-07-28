import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class AlertGeneral extends Component {
  render () {
    const { 
      listCity, 
      alertCity 
    } = this.props;
    return (
      <div className='alertbox'>
        {(alertCity === listCity) ?
          <div>
            <div>
              {`Weather alert for ${(listCity).toUpperCase()}`} 
            </div>
            <div className='alertbutton'>
              <Link to={{
                pathname: `/alerts/${listCity}`,
              }}>
                Get more information
              </Link>
            </div>
          </div> 
          :  
          <div>
            <div>
              Good news,<br/>
              there are currently no weather alerts in your area.
            </div>
            <div className='alertbutton'>
              <Link to='/alerts'>
                Prepare in case of future alerts
              </Link>
            </div>
          </div>
        }
      </div>
      )
    }
  }

export default AlertGeneral;