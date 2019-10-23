import React, { Component } from 'react';

import { Icon } from './StyleWeather'

import CLEAR_DAY from '../../assets/climate-icons/clear-day.svg';
import CLEAR_NIGHT from '../../assets/climate-icons/clear-night.svg';
import CLOUDY from '../../assets/climate-icons/cloudy.svg';
import FOG from '../../assets/climate-icons/fog.svg';
import PARTLY_CLOUDY_DAY from '../../assets/climate-icons/partly-cloudy-day.svg';
import PARTLY_CLOUDY_NIGHT from '../../assets/climate-icons/partly-cloudy-night.svg';
import RAIN from '../../assets/climate-icons/rain.svg';
import SLEET from '../../assets/climate-icons/sleet.svg';
import SNOW from '../../assets/climate-icons/snow.svg';
import WIND from '../../assets/climate-icons/wind.svg';

const climateIcons = {
  'clear-day': CLEAR_DAY, 
  'clear-night': CLEAR_NIGHT, 
  'cloudy': CLOUDY, 
  'fog': FOG, 
  'partly-cloudy-day': PARTLY_CLOUDY_DAY,
  'partly-cloudy-night': PARTLY_CLOUDY_NIGHT, 
  'rain': RAIN, 
  'sleet': SLEET, 
  'snow': SNOW, 
  'wind': WIND,
};

export class ClimateIcons extends Component {
 
  render () {
    const { 
      darkskyIcon
    } = this.props;

    const ClimateIcons = 
      !darkskyIcon 
      ? 'Loading icon'
      : <Icon src={climateIcons[darkskyIcon]} alt="icon of weather conditions"/>;

    return (
      <div>{ClimateIcons}</div>
    )
  }
};

export default ClimateIcons;