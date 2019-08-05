import styled from 'styled-components';

export const Wrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  `;

export const WeekDay = styled.div`
  font-size: 22px;
  align-self: flex-end;
  margin-left: 60px;
  margin-top: 20px;
  color: #4E5166;
`;

export const Logo = styled.div`
  margin-top: 5px;
  align-self: flex-start;
  z-index: 2;
  position: absolute;
`;

export const FormContainer = styled.div`
  top: 180px;
  z-index: 1;
  position: absolute;
  justify-content: center;
`;

export const InputForm = styled.form`
  display: flex;
  margin-top: -30px;
  width: 60vw; 
  align-content: center;
  margin-bottom: 30px;

`;

export const UserInput = styled.input`
  align-content: space-between;
  margin-top: 5px;
  margin-left: 60px;
  width: 260px;
  padding: 3px;
  font-size: 20px;
  border-width: 1.5px;
  border-color: #FFC145;
  background-color: none;
  color: #4E5166;
  border-style: solid;
  border-radius: 5px;
  text-shadow: -50px 0px 1px rgba(66,66,66,.0);

`;

export const SubmitButton = styled.input`
  margin-top: 5px;
  align-content: space-between;
  font-size: 6px;
  color: #ffc145e3;
  background-color: #ffc145e3;
  height: 30px;
  width: 30px;
  border-radius: 50%;
`;

export const City = styled.p`
  margin-top: 80px;
  font-size: 36px;
  color: #223127;
  font-weight: 700;
`;

export const Region = styled.p`
  margin-top: -38px;
  font-size: 18px;
  font-weight: bold;
  color: #4E5166;
  font-weight: 700; 
`;

export const Temperature = styled.div`
  font-size: 60px;
  margin-top: 10px;
  color: #4E5166;
  display: flex;
  justify-content:center;
  height: 130px;
`;

export const Degrees = styled.div`
  color: #FF9F1c;
  font-size: 40px;
`;

export const Time = styled.div`
  font-size: 22px;
  align-self: flex-end;
  margin-left: 60px;
  margin-top: -20px;
`;

export const ConditionsContainer = styled.div`
  margin-top: -40px;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  border: 1px solid #ffc145e3;
  background-color: #4E5166;
  border-radius: 5px;
`;

export const Icon = styled.img`
  width: 100px;
`;

export const Summary = styled.p`
  margin: 20px;
  font-size: 22px
`;