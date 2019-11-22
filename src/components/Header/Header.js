import React, { Component } from 'react';
import Moment from 'react-moment';

import LogoImg from '../../assets/listo_transp.png';
import Water from '../../assets/Water.png';
import Flood from '../../assets/flood.png';
import Earthquake from '../../assets/Earthquake.png';
import Wildfire from '../../assets/Wildfire.png';
import Volcano from '../../assets/Volcano.png';
import Tornado from '../../assets/Tornado.png';

import { HeaderContainer, Icon, IconContainer, Spacer, InfoContainer, Logo, WeekDay, Time } from './StyleHeader';

import './Header.css';

export class Header extends Component {

  render () {
    let styles = {
      margin: "10px 0px 10px 8px"
    };

    return (
      <HeaderContainer>
        <Spacer />
        <IconContainer>
          <Icon className="jiggle" style={styles} alt="moving icon" src={Water}/>
          <Icon className="jiggle" style={styles} alt="moving icon" src={Flood}/>
          <Icon className="jiggle" style={styles} alt="moving icon" src={Tornado}/>
          <Icon className="jiggle" style={styles} alt="moving icon" src={Volcano}/>
          <Icon className="jiggle" style={styles} alt="moving icon" src={Earthquake}/>
          <Icon className="jiggle" style={styles} alt="moving icon" src={Wildfire}/>
        </IconContainer>
        <Spacer/>
        <InfoContainer>
          <Logo><img src={LogoImg} width="100" alt="logo"/></Logo>
          <WeekDay><p>{new Date().toLocaleDateString('en-us',  {weekday: 'long' })}</p></WeekDay>
          <Time><Moment format="HH:mm">{new Date()}</Moment></Time>
        </InfoContainer>
      </HeaderContainer>
    )
  }
}

export default Header;