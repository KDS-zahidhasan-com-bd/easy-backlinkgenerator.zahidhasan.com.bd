import React from 'react';
import styled from 'styled-components';
import BacklinkGenerator from './components/BacklinkGenerator';
import Footer from './components/Footer';
import ScrollButtons from './components/ScrollButtons';

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  background-color: #121212;
  color: #E0E0E0;
  padding: 20px;
  min-height: 100vh;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <BacklinkGenerator />
      <Footer />
      <ScrollButtons />
    </AppContainer>
  );
};

export default App;

