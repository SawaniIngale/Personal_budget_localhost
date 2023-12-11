import React from 'react';

const heroStyle = {
  height: '250px',
  backgroundColor: '#b4c6f0',
  backgroundImage: 'url("/public/bg.png")',
  backgroundSize: '400px',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center bottom',
  paddingTop: '40px',
  marginBottom: '20px'
};

const headingStyle = {
  textAlign: 'center',
  margin: '0',
};

const h1Style = {
  color: '#fff',
  fontSize: '4.2em',
  marginBottom: '20px',
  fontFamily: 'Arial, sans-serif',
};

const h2Style = {
  color: '#4d5791',
};

function Hero() {
  return (
    <div style={heroStyle}>
      <h1 style={{ ...headingStyle, ...h1Style }}>Personal Budget</h1>
      <h2 style={{ ...headingStyle, ...h2Style }}>A personal-budget management app</h2>
    </div>
  );
}

export default Hero;
