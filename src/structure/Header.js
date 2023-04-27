import React from 'react';
import iceCreamImg from '../assets/img/ultimate-ice-cream.svg';

export default function Header() {
  return (
    <header>
      <h1>
        <img src={iceCreamImg} alt="logo" />
        Ultimate Ice Cream Machine
      </h1>
    </header>
  );
}
