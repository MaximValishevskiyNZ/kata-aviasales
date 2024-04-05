import React from 'react';
import './Logo.css';

export default function Logo() {
  return (
    <div className="logo-container">
      <img
        src='https://i.imgur.com/gIqEYCt.png'
        alt="Descriptive alternative text of the image"
        className="logo"
        loading="lazy"
      />
    </div>
  );
}
