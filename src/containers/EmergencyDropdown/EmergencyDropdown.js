  import React, { Component } from 'react'
  import axios from 'axios';

  const serverUrl = 'http://localhost:4001'

  export class EmergencyDropdown extends Component {

    constructor(props) {
      super(props);
      this.state = {
        displayMenu: false,
        emergencyType: '',
        preparationsList: [],
        selectedEmergency: ''
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
    
    displayDropdown = (event) => {
      event.preventDefault();
      this.setState({ displayMenu: true }, () => {
        document.addEventListener('click', this.hideDropdown);
      });
    }

    hideDropdown = () => {
      this.setState({ displayMenu: false }, () => {
        document.removeEventListener('click', this.hideDropdown)
      })
    }

    selectEmergency = (event) => {
      this.setState({selectedEmergency: event.target.innerHTML})
    }

    render() {
      const { 
        displayMenu, 
        emergencyType, 
        preparationsList,
        selectedEmergency
      } = this.state;
      const emergencyList = [
        'Floods',
        'Earthquakes',
        'Wildfires',
        'Tsunamis',
        'Volcanic eruptions',
        'Tornadoes',
        'Apocalypse'
      ];
      const emergencyItems = 
        emergencyList
          .map(item => 
            <li key={item} value={item}>
              {item}
            </li>
          )
      const preparationsItems = 
        preparationsList
          .map(item => 
            <li key={item} value={item}>
              {item}
            </li>
          )
      return (
        <div className="alertDetail">
          <div className='dropdown' style = {{background:'grey',width:'200px'}}>
            <div className='button' onClick={this.displayDropdown}>Disasters</div>
              {displayMenu ? (
                <div>
                  <div 
                    value={selectedEmergency} 
                    onClick={this.selectEmergency}
                  >
                    {emergencyItems}
                  </div>
                </div>
                )
                :
                (
                  null
                )
              }
          </div>
          <h1 className='emergency-title'>
            How to prep for<br/>
            the unexpected:
            <br/> {(emergencyType).toLowerCase()}
          </h1>
          <div className='list'>
            {selectedEmergency && selectedEmergency === emergencyType ? (
              <li>{preparationsItems}</li> 
            )
            :
            (
              <a href='https://www.ready.gov/'>Extra information on prepping for natural disasters</a>
            )
            }
          </div>
        </div>
      )
    }
  }

  export default EmergencyDropdown;