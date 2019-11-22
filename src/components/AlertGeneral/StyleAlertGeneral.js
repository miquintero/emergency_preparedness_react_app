import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AlertContainer = styled.div`
  border: 1px solid #FF9F1C;
  padding: 5px;
  border-radius: 5px;
  background-color: white;
`;

export const AlertButton = styled.div`
  background-color:#ffc145;
  -moz-border-radius:5px;
  -webkit-border-radius:5px;
  border-radius:10px;
  border:1px solid #223127;
  display:inline-block;
  cursor:pointer;
  color:#223127;
  font-family:Arial;
  font-size:16px;
  padding:8px 16px;
  margin-top: -10px;
  margin-bottom: 10px;
  text-decoration:none;
  font-weight: 500;
  font-family: 'Darker Grotesque', sans-serif;
  ::hover {
    background: #4E5166;
  }
`;

export const AlertText = styled.div`
  margin-top: -20px;
  font-size: 18px;
  margin: 20px;
  color: red;
  font-weight: 800
`;

export const Icon = styled.img`
  width: 100px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  border-radius: 8px;
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`;

