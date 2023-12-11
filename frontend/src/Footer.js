import React from 'react';

const bottom = {
    height: '50px',
    backgroundColor: '#b4c6f0',
    padding: '10px', // You might want to adjust this value based on your design
    marginTop : 650,
  };
  
  const center = {
    textAlign: 'center',
  };

function Footer() {
  return (
    <div style ={bottom}>
            <div style={center}>
                All rights reserved &copy; Sawani Ingale
            </div>
        </div>
  );
}

export default Footer;