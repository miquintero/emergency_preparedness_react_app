import styled from 'styled-components';

export const AlertContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EmergencyContainer = styled.div`
  display: flex;
  width: 76%;
  align-content: center;
  margin: 20px 50px 30px 22px;
  padding-right: 10px;
  border-radius: 5px;
  background-color: white;
`;

export const LogoContainer = styled.div`
  display: flex;
  width: 80%;
  margin-left: 20px;
  border-radius: 5px;
  justify-content: center; 
  margin-bottom: 20px;
  background-color: #4E5166;
  padding-top: 10px;

`;

export const IconOne = styled.img`
  margin-top: 40px;
  margin-left: 20px;
  height: 80px;
  flex: 1;
`;

export const IconTwo = styled.img`
  margin-left: 20px;
  height: 50px;
`;

export const City = styled.p`
  color: #223127;
  font-size: 40px;
  margin-bottom: -50px;
  text-shadow: -50px 0px 1px rgba(66,66,66,.0);
`;

export const AlertTitle = styled.p`
  font-size: 20px;
  margin-left: 20px;
  padding-right: 20px;
  color: #4E5166;
  font-weight: 600;
  flex: 2;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 80%;
  margin-top:200px;
  margin-left: 20px;
`;

export const ExpirationTitle = styled.div`
  font-size: 18px;
  margin-bottom: 14px;
  font-weight: 600;
  color: #223127;
`;

export const EmergencyTitle = styled.div`
  font-size: 30px;
  text-align: center;
  margin-bottom: -5px;
  color: red;
  font-weight: 500;
  `;

export const Spacer = styled.div`
  flex: 1;
  width: 30px;
`;