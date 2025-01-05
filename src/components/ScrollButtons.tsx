import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ScrollButton = styled.button`
  background-color: #00B786;
  color: #fff;
  border: none;
  padding: 15px;
  font-size: 18px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 50px;
  height: 50px;

  &:hover {
    background-color: #009f71;
  }
`;

const ScrollButtons: React.FC = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.pageYOffset > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  return (
    <ButtonContainer>
      {showTopButton && (
        <ScrollButton onClick={scrollToTop} aria-label="Scroll to top">
          ↑
        </ScrollButton>
      )}
      <ScrollButton onClick={scrollToBottom} aria-label="Scroll to bottom">
        ↓
      </ScrollButton>
    </ButtonContainer>
  );
};

export default ScrollButtons;

