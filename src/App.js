import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from './structure/Header';
import Footer from './structure/Footer';
import { Menu } from './iceCream/Menu';
import '../src/assets/css/style.css';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Menu />
      <Footer />
    </BrowserRouter>
  );
}
