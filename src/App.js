import React, { useState, useEffect } from 'react';
import './App.css';

function BacklinkGenerator() {
  const [keywords, setKeywords] = useState('');
  const [backlinks, setBacklinks] = useState('');
  const [generatedLinks, setGeneratedLinks] = useState([]);
  const [error, setError] = useState('');
  const [showGoTopBtn, setShowGoTopBtn] = useState(false);

  const handleGenerate = () => {
    const keywordArray = keywords.split('\n').map((kw) => kw.trim());
    const backlinkArray = backlinks.split('\n').map((bl) => bl.trim());

    if (keywordArray.length !== backlinkArray.length || keywordArray.length === 0) {
      setError('The number of keywords and backlinks must match, and neither field can be empty!');
      return;
    }

    setError('');
    const links = keywordArray.map((keyword, index) => {
      const link = backlinkArray[index].replace(/\/+$/, ''); // Remove trailing slashes
      const htmlLink = `<a href="${link}">${keyword.toLowerCase()}</a>`;
      return { htmlLink, renderedLink: <a href={link}>{keyword.toLowerCase()}</a> };
    });
    setGeneratedLinks(links);
  };

  const copyLinks = () => {
    const linksToCopy = generatedLinks.map((item) => item.htmlLink).join('\n');
    navigator.clipboard
      .writeText(linksToCopy)
      .then(() => alert('Links copied to clipboard!'))
      .catch((err) => alert(`Failed to copy links: ${err}`));
  };

  const clearAll = () => {
    setKeywords('');
    setBacklinks('');
    setGeneratedLinks([]);
    setError('');
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowGoTopBtn(true);
      } else {
        setShowGoTopBtn(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>Backlink Generator</h1>
        <p>Generate Anchor tags.</p>
      </div>

      <div className="form-container">
        <label htmlFor="keywords">Keywords:</label>
        <textarea
          id="keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Keyword 1&#10;Keyword 2&#10;..."
        />

        <label htmlFor="backlinks">Backlinks:</label>
        <textarea
          id="backlinks"
          value={backlinks}
          onChange={(e) => setBacklinks(e.target.value)}
          placeholder="Backlink 1&#10;Backlink 2&#10;..."
        />

        <button onClick={handleGenerate}>Generate Backlinks</button>
        {error && <p className="error">{error}</p>}
      </div>

      {generatedLinks.length > 0 && (
        <>
          <h2>Generated Links</h2>
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {generatedLinks.map((item, index) => (
                <tr key={index}>
                  <td>{item.htmlLink}</td>
                  <td>{item.renderedLink}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button id="copyBtn" onClick={copyLinks}>
            Copy Links
          </button>
          <button id="clearBtn" onClick={clearAll}>
            Clear
          </button>
        </>
      )}

      <footer>
        <p>
          <span className="copyright">©</span> {new Date().getFullYear()} Backlink Generator - Created with ❤️ by Zahid Hasan
        </p>
      </footer>

      {/* Floating Buttons */}
      <div className="scroll-button-container">
        <button id="goBottomBtn" className="scroll-button" onClick={scrollToBottom}>
          ↓
        </button>
        {showGoTopBtn && (
          <button id="goTopBtn" className="scroll-button" onClick={scrollToTop}>
            ↑
          </button>
        )}
      </div>
    </div>
  );
}

export default BacklinkGenerator;
