import styled from 'styled-components';

export const AlertContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const EmergencyTitle = styled.div`
  text-align: center;
  font-size: 36px;
  margin-top: 40px;
  margin-bottom: 32px;
  line-height: 0.8;
  color: #223127;
  font-weight: 600;
  `;

export const DropDown = styled.div`
  align-items:center;
  top: 40px;
  margin: -20px 0 -10px 0;
  list-style: none;
  margin-bottom: 30px;
  height:18px;
  background-color: #FFC145 ;
  padding:12px;
  border: 1px #4E5166 solid;
  font-size: 20px;
  border-radius:10px;
  font-weight:600;
  color: #223127;
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
  &:hover {
    background: #4E5166;
  }
  `;

export const Bounce = styled.div`
    margin: 0;
  `;

export const Items = styled.div`
    list-style: none;
    margin-left: 40px;
    margin-top: -15px;
    margin-bottom: 120px;
    font-size: 24px;
    color: #223127;
    font-weight: 700;
    background-color: #EDEAD0;
    border-radius: 5px;
    padding: 20px;
  `;

export const ListItems = styled.div`
    border-bottom: 2px #3AB795 dotted;
    padding: 5px;
    font-size: 20px;
    font-weight: 600;
    color: #4E5166;
  `;

export const Bolded = styled.div`
    color: red;
    font-weight: 700;
    font-size:40px;
    margin-bottom: -10px;
  `;

export const List = styled.div`
    display: flex;
    position: fixed;
    width: 70%;
    margin-top: -20px;
    justify-content: center;
    overflow: scroll;
`;