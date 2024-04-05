import React from 'react';
import './Logo.css';

export default function Logo() {
  return (
    <div className="logo-container">
      <img
        src={window.location.origin + '/src/assets/Logo.png'}
        alt="Descriptive alternative text of the image"
        className="logo"
        loading="lazy"
      />
    </div>
  );
}
