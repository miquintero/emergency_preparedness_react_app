import React, { Component } from 'react';
import styled from 'styled-components'
import Moment from 'react-moment';

import LogoImg from '../../assets/listo_transp.png';
import Water from '../../assets/Water.png';
import Flood from '../../assets/flood.png';
import Earthquake from '../../assets/Earthquake.png';
import Wildfire from '../../assets/Wildfire.png';
import Volcano from '../../assets/Volcano.png';
import Tornado from '../../assets/Tornado.png';

import './Header.css';

const HeaderContainer = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: -30px;
`;

const IconContainer = styled.div`
  margin-top:20px;
  flex: 3;
  display: flex;
  align-content: flex-start; 
  justify-content: space-between;
  flex-wrap: wrap;
  margin-right: 20px;
`;

const Spacer = styled.div`
  flex: 1;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-end;
  flex: 1;
  color: #4E5166;
  /* background-color: orange; */
`;

const Logo = styled.div`
  align-self: flex-end;
`;

const WeekDay = styled.div`
  align-self: flex-end;
  margin-top: -20px;
`;

const Time = styled.div`
  align-self: flex-end;
  margin-top: -15px;
  color: white;
  font-weight: 800;
`;

export class Header extends Component {

  render () {

    let styles = {
      margin: "10px 0px 10px 8px"
    };

    return (
      <HeaderContainer>
        <Spacer />
        <IconContainer>
          <img className="jiggle" style={styles} width="24" alt="moving icon" src={Water}/>
          <img className="jiggle" style={styles} width="24" alt="moving icon" src={Flood}/>
          <img className="jiggle" style={styles} width="24" alt="moving icon" src={Tornado}/>
          <img className="jiggle" style={styles} width="24" alt="moving icon" src={Volcano}/>
          <img className="jiggle" style={styles} width="24" alt="moving icon" src={Earthquake}/>
          <img className="jiggle" style={styles} width="24" alt="moving icon" src={Wildfire}/>
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

