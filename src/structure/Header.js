import React from 'react';
import iceCreamImg from '../assets/img/ultimate-ice-cream.svg';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <h1>
        <img src={iceCreamImg} alt="logo" />
        Ultimate Ice Cream Machine
      </h1>
      <nav>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? '' : isActive ? 'active' : 'notActive'
          }
          exact="true"
        >
          Menu
        </NavLink>
      </nav>
    </header>
  );
}
