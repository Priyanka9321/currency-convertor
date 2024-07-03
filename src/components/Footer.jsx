import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>©2024PriyankaYadav. All rights reserved.</p>
    </footer>
  );
};

const footerStyle = {
  textAlign: 'center',
  padding: '1rem',
  backgroundColor: '#f1f1f1',
  position: 'fixed',
  bottom: '0',
  width: '100%'
};

export default Footer;
