import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import GeneratedLinks from './GeneratedLinks';

const FormContainer = styled.div`
  background-color: #1E1E1E;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
  margin-bottom: 20px;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #2C2C2C;
  color: #b7b7b7;
  border: 0.5px solid #444;
  outline: 0.5px solid #444;
  font-size: 16px;
  border-radius: 5px;
  box-sizing: border-box;

  &:focus {
    border-color: #00B786;
    outline-color: #00B786;
  }
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

  &:hover {
    background-color: #009f71;
  }
`;

const BacklinkGenerator: React.FC = () => {
  const [keywords, setKeywords] = useState('');
  const [backlinks, setBacklinks] = useState('');
  const [generatedLinks, setGeneratedLinks] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const keywordArray = keywords.split('\n').filter(k => k.trim() !== '');
    const backlinkArray = backlinks.split('\n').filter(b => b.trim() !== '');

    if (keywordArray.length === backlinkArray.length && keywordArray.length > 0) {
      const links = keywordArray.map((keyword, index) => {
        const text = keyword.trim();
        const link = backlinkArray[index].trim().replace(/\/$/, '');
        return `<a href="${link}">${text}</a>`;
      });
      setGeneratedLinks(links);
    } else {
      alert('The number of keywords and backlinks must match, and neither field can be empty!');
    }
  };

  const handleClear = () => {
    setGeneratedLinks([]);
  };

  return (
    <>
      <Header />
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <label htmlFor="keywords">Keywords:</label><br />
          <StyledTextarea
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="Keyword 1&#10;Keyword 2&#10;..."
          /><br />

          <label htmlFor="backlinks">Backlinks:</label><br />
          <StyledTextarea
            id="backlinks"
            value={backlinks}
            onChange={(e) => setBacklinks(e.target.value)}
            placeholder="Backlink 1&#10;Backlink 2&#10;..."
          /><br />

          <StyledButton type="submit">Generate Backlinks</StyledButton>
        </form>
      </FormContainer>
      {generatedLinks.length > 0 && <GeneratedLinks links={generatedLinks} onClear={handleClear} />}
    </>
  );
};

export default BacklinkGenerator;

