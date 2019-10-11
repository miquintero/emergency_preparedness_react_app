import styled from 'styled-components'

export const HeaderContainer = styled.div`
display: flex;
margin-top: 20px;
margin-bottom: -30px;
`;

export const IconContainer = styled.div`
margin-top:20px;
flex: 3;
display: flex;
align-content: flex-start; 
justify-content: space-between;
flex-wrap: wrap;
margin-right: 20px;
`;

export const Spacer = styled.div`
flex: 1;
`;

export const InfoContainer = styled.div`
display: flex;
flex-direction: column;
align-content: flex-end;
flex: 1;
color: #4E5166;
`;

export const Logo = styled.div`
align-self: flex-end;
`;

export const WeekDay = styled.div`
align-self: flex-end;
margin-top: -20px;
`;

export const Time = styled.div`
align-self: flex-end;
margin-top: -15px;
color: white;
font-weight: 800;
`;

export const Icon = styled.img`
  width: 6vw;
  height: 4vh;
`;