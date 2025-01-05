import React, { useState } from 'react';
import styled from 'styled-components';

const LinksContainer = styled.div`
  background-color: #1E1E1E;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #1E1E1E;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

const StyledTh = styled.th`
  padding: 12px;
  border: 1px solid #444;
  text-align: left;
  color: #b7b7b7;
  background-color: #333;
`;

const StyledTd = styled.td`
  padding: 12px;
  border: 1px solid #444;
  text-align: left;
  color: #b7b7b7;
  background-color: #232323;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #2C2C2C;
  color: #b7b7b7;
  border: 1px solid #444;
  outline: 1px solid #444;
  font-size: 16px;
  border-radius: 5px;
  box-sizing: border-box;
`;

const StyledButton = styled.button`
  background-color: #00B786;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
  margin-top: 10px;

  &:hover {
    background-color: #009f71;
  }
`;

interface GeneratedLinksProps {
  links: string[];
  onClear: () => void;
}

const GeneratedLinks: React.FC<GeneratedLinksProps> = ({ links, onClear }) => {
  const [copied, setCopied] = useState(false);
  const [cleared, setCleared] = useState(false);

  const handleCopy = () => {
    const textToCopy = links.join('\n');
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => alert('Failed to copy links: ' + err));
  };

  const handleClear = () => {
    onClear();
    setCleared(true);
    setTimeout(() => setCleared(false), 2000);
  };

  return (
    <LinksContainer>
      <h2>Generated Links <small><i>(Small case, Without Slash)</i></small></h2>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>Code</StyledTh>
            <StyledTh>Link</StyledTh>
          </tr>
        </thead>
        <tbody>
          {links.map((link, index) => {
            const lowercaseLink = link.replace(/>([^<]+)</g, (match, p1) => `>${p1.toLowerCase()}<`);
            return (
              <tr key={index}>
                <StyledTd>{lowercaseLink}</StyledTd>
                <StyledTd dangerouslySetInnerHTML={{ __html: lowercaseLink }} />
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
      <StyledButton onClick={handleCopy}>
        {copied ? 'Copied!' : 'Copy Links'}
      </StyledButton>
      <StyledButton onClick={handleClear} style={{ marginLeft: '10px' }}>
        {cleared ? 'Cleared!' : 'Clear'}
      </StyledButton>
      <h2>Generated Links <small><i>(All Case, Without Slash)</i></small></h2>
      <StyledTextarea 
        readOnly 
        value={links.join('\n')} 
      />
    </LinksContainer>
  );
};

export default GeneratedLinks;

