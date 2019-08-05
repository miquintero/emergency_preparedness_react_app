import React, { Component } from 'react'
import axios from 'axios';
import Header from '../../components/Header/Header';

import { AlertContainer, EmergencyTitle, DropDown, Bounce, Items, ListItems, Bolded, List } from './StyleEmergencyDropdown';
import './bounce.css';

const serverUrl = 'http://localhost:4004'

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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedEmergency !== this.state.selectedEmergency) {
      this.getSuggestions(this.state.selectedEmergency);
    }
  }

  getSuggestions = async (disaster) => {
    await axios({
      method: 'get',
      url: `${serverUrl}/disaster/${disaster}`,
      'content-type': 'application/json'
    })
      .then(({ data }) => {
        data && this.setState({
          emergencyType: data.emergency,
          preparationsList: data.list
        });
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

  selectEmergency = (emergency) => {
    this.setState({ selectedEmergency: emergency })
  }

  render() {
    const {
      displayMenu,
      emergencyType,
      preparationsList,
      selectedEmergency
    } = this.state;
    const emergencyList = [
      'flood',
      'earthquake',
      'wildfire',
      'tsunami',
      'volcanic eruption',
      'tornado',
      'apocalypse'
    ];
    const emergencyItems =
      emergencyList
        .map(item =>
          <li key={item} value={item} onClick={() => { this.selectEmergency(item) }}>
            {`${(item).charAt(0).toUpperCase()}${(item).slice(1)}`}
          </li>
        )
    const preparationsItems =
      preparationsList
        .map(item =>
          <ListItems key={item} value={item} className="disasters">
            {item}
          </ListItems>
        )
    return (
      <div className="preload">
        <Header />
        <AlertContainer>
          <Bounce className="stage">
            <EmergencyTitle className="box bounce-5">
              How to prep for<br />
              the unexpected
              <br /><Bolded>{emergencyType}</Bolded>
            </EmergencyTitle>
          </Bounce>
          <div>
            <DropDown onClick={this.displayDropdown}>Natural Disasters (Mostly)</DropDown>
            {displayMenu 
            ? (<div>
                <Items value={selectedEmergency}>
                  {emergencyItems}
                </Items>
              </div>)
            : (null)
            }
            <List className='list'>
              {selectedEmergency 
              ? (<div>{preparationsItems}</div>) 
              : (null)
              }
            </List>
          </div>
        </AlertContainer>
      </div>
    )
  }
}

export default EmergencyDropdown;