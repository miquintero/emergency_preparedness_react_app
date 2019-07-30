  import React, { Component } from 'react'
  import axios from 'axios';
  import styled from 'styled-components'

  const serverUrl = 'http://localhost:4001'

  const AlertContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    `;

const EmergencyTitle = styled.div`
    text-align: center;
    font-size: 36px;
    margin-top: 40px;
    `;

const DropDown = styled.div`
  align-items:center;
  /* position: relative; */
  /* display: inline-block; */
  top: 40px;
  margin: 30px 0;
  /* margin-bottom: 50px; */
  height:18px;
  background-color: #FFC145 ;
  padding:12px;
  border-radius:5px;
  font-weight:bold;
  color:white;
  ::before{
    content:"";
    position:absolute;
    width:0px;
    height:0px;
    border: 10px solid;
    border-color: white transparent transparent transparent;
    right:6px;
    top:18px;
  }
  `;

  const MoreInfo = styled.a`
    display: flex;
    /* position: fixed; */
    justify-content: center;
    align-items: flex-end;
    text-align: center;
    /* margin-bottom: 20px; */
  `;

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
      this.setState({selectedEmergency: emergency})
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
            <li key={item} value={item} onClick={() => {this.selectEmergency(item)}}>
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
        <div>
          <AlertContainer>
          <EmergencyTitle>
            How to prep for<br/>
            the unexpected
            <br/> {emergencyType}
          </EmergencyTitle>
          <div>
            <DropDown onClick={this.displayDropdown}>Disasters</DropDown>
              {displayMenu ? 
                (<div>
                  <div value={selectedEmergency} >
                    {emergencyItems}
                  </div>
                </div>)
                :
                (null)
              }
            <div className='list'>
              {selectedEmergency ? 
                (<div>{preparationsItems}</div>):
                (null)
              }
            </div>
          </div>
          </AlertContainer>
         <MoreInfo href='https://www.ready.gov/'>More info at Ready</MoreInfo>
        </div>
      )
    }
  }

  export default EmergencyDropdown;