  import React, { Component } from 'react'
  import axios from 'axios';
  import styled from 'styled-components';
  import Header from '../Header/Header';
  import './bounce.css';

  const serverUrl = 'http://localhost:4004'

  const AlertContainer = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `;

const EmergencyTitle = styled.div`
    text-align: center;
    font-size: 36px;
    margin-top: 40px;
    margin-bottom: 32px;
    line-height: 0.8;
    color: #223127;
    font-weight: 600;
    text-shadow: -50px 0px 1px rgba(66,66,66,.0);
    `;

const DropDown = styled.div`
  align-items:center;
  /* position: relative; */
  /* display: inline-block; */
  -moz-box-shadow: -1px 2px 16px -1px #4d544b;
	-webkit-box-shadow: -1px 2px 16px -1px #4d544b;
  top: 40px;
  margin: -20px 0 -10px 0;
  list-style: none;
  margin-bottom: 30px;
  height:18px;
  background-color: #FFC145 ;
  padding:12px;
  font-size: 20px;
  border-radius:5px;
  font-weight:600;
  color: #223127;
  text-shadow: -50px 0px 1px rgba(66,66,66,.0);
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

  const Bounce = styled.div`
    margin: 0;
  `;

  const Items = styled.div`
    list-style: none;
    margin-left: 40px;
    margin-top: -15px;
    margin-bottom: 120px;
    font-size: 24px;
    color: #4E5166;
    font-weight: 700;
    background-color: #EDEAD0;
    border-radius: 5px;
    padding: 20px;
  `;

  const MoreInfo = styled.a`
    display: flex;
    position: fixed;
    justify-content: center;
    align-items: flex-end;
    text-align: center;
    margin-top: 20px;
  `;

  const ListItems = styled.div`
    /* margin-right: 20px; */
    border-bottom: 2px #3AB795 dotted;
    padding: 5px;
    font-size: 20px;
    font-weight: 600;
    color: #223127;
  `;

  const Bolded = styled.div`
    color: #908484;
    font-weight: 700;
    font-size:40px;
    /* margin-top: -5px; */
    margin-bottom: -10px;
  `;

  const List = styled.div`
    display: flex;
    position: fixed;
    width: 70%;
    margin-top: -20px;
    justify-content: center;
    overflow: scroll;
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

    componentDidMount() {
      this.noLoad();
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

    noLoad = () => {
      console.log('I have been classd!')
      document.addEventListener('DOMContentLoaded', () => {
        document.getElementsByClassName('preload')[0].classList.remove('preload');
      })
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
        <Header/>
          <AlertContainer>
          <Bounce className="stage">
            <EmergencyTitle className="box bounce-5">
              How to prep for<br/>
              the unexpected
              <br/><Bolded>{emergencyType}</Bolded>
            </EmergencyTitle>
          </Bounce>
          <div>
            <DropDown onClick={this.displayDropdown}>Natural Disasters (Mostly)</DropDown>
              {displayMenu ? 
                (<div>
                  <Items value={selectedEmergency}>
                    {emergencyItems}
                  </Items>
                </div>)
                :
                (null)
              }
            <List className='list'>
              {selectedEmergency ? 
                (<div>{preparationsItems}</div>):
                (null)
              }
            </List>
            </div>
          </AlertContainer>
         {/* <MoreInfo href='https://www.ready.gov/'>More info at Ready</MoreInfo> */}
          </div>
      
      )
    }
  }

  export default EmergencyDropdown;