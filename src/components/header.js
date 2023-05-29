import React from 'react';
import './header.css';

const logos = [
    "https://www.bundesliga.com/assets/clublogo/DFL-CLU-000007.svg",
    "https://www.bundesliga.com/assets/clublogo/DFL-CLU-00000A.svg",
    "https://www.bundesliga.com/assets/clublogo/DFL-CLU-00000Z.svg",
    "https://www.bundesliga.com/assets/clublogo/DFL-CLU-00000V.svg", 
    "https://www.bundesliga.com/assets/clublogo/DFL-CLU-00000E.svg", 
    "https://www.bundesliga.com/assets/clublogo/DFL-CLU-00000F.svg", 
    "https://www.bundesliga.com/assets/clublogo/DFL-CLU-000002.svg", 
    "https://www.bundesliga.com/assets/clublogo/DFL-CLU-000008.svg", 
    "https://www.bundesliga.com/assets/clublogo/DFL-CLU-00000B.svg", 
    "https://www.bundesliga.com/assets/clublogo/DFL-CLU-000006.svg", 
    "https://www.bundesliga.com/assets/clublogo/DFL-CLU-000004.svg",
    "https://www.bundesliga.com/assets/clublogo/DFL-CLU-00000G.svg", 
    "https://www.bundesliga.com/assets/clublogo/DFL-CLU-000009.svg", 
    "https://www.bundesliga.com/assets/clublogo/DFL-CLU-00000D.svg", 
    "https://www.bundesliga.com/assets/clublogo/DFL-CLU-000003.svg", 
    "https://www.bundesliga.com/assets/clublogo/DFL-CLU-000010.svg"
    // ... add the remaining logos here
  ];

  
const Header = ({ title }) => {
  const maxLogosPerRow = 9;

  // Split the logos into rows
  const rows = [];
  for (let i = 0; i < logos.length; i += maxLogosPerRow) {
    const rowLogos = logos.slice(i, i + maxLogosPerRow);
    rows.push(rowLogos);
  }
  return (
    <div className="App-header">
      <h1 className='title'>
        {title}
        <span className="subtitle">
          <a href="https://tr3x.xyz" target="_blank" rel="noopener noreferrer">by Leon Burghardt</a>
        </span>
      </h1>
      <div className="logos-row">
        {rows.map((row, index) => (
          <div className="logo-row" key={index}>
            {row.map((logo, logoIndex) => (
              <img
                src={logo}
                alt={`Logo ${index * maxLogosPerRow + logoIndex + 1}`}
                className="logo"
                key={logoIndex}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};  

export default Header;
