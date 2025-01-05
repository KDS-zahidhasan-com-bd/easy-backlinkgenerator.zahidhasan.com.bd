import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  text-align: center;
  color: #b7b7b7;
  margin-top: 40px;
`;

const Copyright = styled.span`
  color: #00B786;
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <StyledFooter>
      <p>
        <Copyright>©</Copyright> {currentYear} Backlink Generator - Created with ❤️ by Zahid Hasan
      </p>
    </StyledFooter>
  );
};

export default Footer;

