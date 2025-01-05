import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #1E1E1E;
  color: #333;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  color: #00B786;
`;

const Subtitle = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  color: #666;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Title>Backlink Generator</Title>
      <Subtitle>Generate Anchor tags.</Subtitle>
    </HeaderContainer>
  );
};

export default Header;

