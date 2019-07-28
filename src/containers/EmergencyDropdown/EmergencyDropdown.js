  import React, { Component } from 'react'
  import axios from 'axios';

  const serverUrl = 'http://localhost:4001'

  export class EmergencyDropdown extends Component {

    constructor(props) {
      super(props);
      this.state = {
        emergencyType: '',
        preparationsList: []
      }
    }

    componentDidMount() {
      this.getSuggestions();
    }

    getSuggestions = async () => {
      await axios({
        method: 'get', 
        url: `${serverUrl}/disaster`,
        'content-type': 'application/json'
      })
      .then(preparations => {
        const emergencyType = preparations.data.emergency;
        const preparationsList = preparations.data.list;
        this.setState({emergencyType: emergencyType});
        this.setState({preparationsList: preparationsList});
      })
      .catch(error => console.log('Error:', error));
    }

    render() {
      const { 
        emergencyType, 
        preparationsList 
      } = this.state;
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
            How to prep for<br/>
            the unexpected:
            <br/> {(emergencyType).toLowerCase()}
          </h1>
          <div className="list">{emergencyItems}</div>  
        </div>
      )
    }
  }

  export default EmergencyDropdown;


