import React, { Component } from 'react'
import axios from 'axios';

const serverUrl = 'http://localhost:4001'

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
    this.getAlertDetails();
    this.getPreparations();
  }

  getAlertDetails = async () => {
    await axios({
      method: 'get', 
      url: `${serverUrl}/alerts/city`,
      'content-type': 'application/json'
    })
    .then(alerts => {
      const alertTitle = alerts.data.title;
      const alertDescription = alerts.data.description;
      const emergencyType = alerts.data.type;
      const alertLevel = alerts.data.severity;
      const expirationTime = alerts.data.expires;
      console.log(alertLevel); 
      //add in the alert, watch, and warning icons
      this.setState({alertTitle: alertTitle});
      this.setState({alertDescription: alertDescription});
      this.setState({emergencyTypeAlert: emergencyType});
      this.setState({alertLevel: alertLevel});
      this.setState({expirationTime: expirationTime });
    })
    .catch(error => console.log('Error:', error));
  }

  getPreparations = async () => {
    await axios({
      method: 'get', 
      url: `${serverUrl}/disaster`,
      'content-type': 'application/json'
    })
    .then(preparations => {
      const emergencyType = preparations.data.emergency;
      const preparationsList = preparations.data.list;
      this.setState({emergencyTypePreparation: emergencyType});
      this.setState({preparationsList: preparationsList});
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
        <li key={item}>
          {item}
        </li>
      )
    return (
      <div className="alertdetail">
        <h1 className="emergency-title">
          {`${(city).charAt(0).toUpperCase()}${(city).slice(1)}`}<br/>
          prepare for a {(emergencyTypeAlert).toLowerCase()}
        </h1>
        <h3 className="alertTitle">{alertTitle}</h3>
        <div className="expiration">{`This alert expires in ${expirationTime}`}</div>
        <div className="description">{alertDescription}</div>
        <div className="list">
          {(emergencyTypeAlert === emergencyTypePreparations) ?     
            <div className="list">
              {emergencyItems}
            </div>  
            :
            <div>
              {`Sorry, there are currently no suggestions for ${emergencyTypeAlert} preparation`}
            </div>
          }
        </div>  
      </div>
    )
  }
}

export default AlertDetails;