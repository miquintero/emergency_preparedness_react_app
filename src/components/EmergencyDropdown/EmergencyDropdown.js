import React, { useEffect, useState } from 'react'

import dataRequests from '../../utils/DataRequests';
import usePrevious from '../../utils/CompareHook';
import Header from '../../components/Header/Header';

import { AlertContainer, EmergencyTitle, DropDown, Bounce, Items, ListItems, Bolded, List } from './StyleEmergencyDropdown';
import './bounce.css';

function EmergencyDropdown() {

  const [emergencyType, setEmergencyType] = useState('');
  const [preparationsList, setPreparationsList] = useState([]);
  const [selectedEmergency, setSelectedEmergency] = useState('');
  const [displayMenu, setDisplayMenu] = useState(false);

  const emergencyList = [
    'flood',
    'earthquake',
    'wildfire',
    'tsunami',
    'volcanic eruption',
    'tornado',
    'apocalypse'
  ];
  
  const getSuggestions = async (disaster) => {
    await dataRequests
    .fetchSuggestions(disaster)
    .then(({ data }) => {
      setEmergencyType(data.emergency);
      setPreparationsList(data.list);
    })
    .catch(error => console.log('Error:', error));
  }
  
  const displayDropdown = event => {
    event.preventDefault();
    displayMenu ? setDisplayMenu(false) : setDisplayMenu(true);
  }
  
  const selectEmergency = emergency => {
    setSelectedEmergency({emergency})
  }
  
  const emergencyItems =
  emergencyList.map(item => (
    <li key={item} value={item} onClick={() => {selectEmergency(item)}}>
          {`${(item).charAt(0).toUpperCase()}${(item).slice(1)}`}
        </li>
    ));
    
    const preparationsItems =
    preparationsList.map(item => (
      <ListItems key={item} value={item} className="disasters">
          {item}
        </ListItems>
    ));
    
    const prevState = usePrevious(selectedEmergency);

    useEffect(() => {
      if (prevState !== selectedEmergency) {
        getSuggestions(selectedEmergency);
      }
    }, []);

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
          <DropDown onClick={displayDropdown}>Natural Disasters (Mostly)</DropDown>
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

export default EmergencyDropdown;