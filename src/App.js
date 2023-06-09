import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Header from './structure/Header';
import Footer from './structure/Footer';
import { Menu } from './iceCream/Menu';
import { EditIceCream } from './iceCream/EditIceCream';
import '../src/assets/css/style.css';
import AddIceCream from './iceCream/AddIceCream';
import IceCreams from './iceCream/IceCreams';

export default function App() {
  return (
    <Router>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <Routes>
        <Route path="/" element={<Menu />} exact="true" />
        <Route path="/menu-items/:menuItemId" element={<EditIceCream />} />
        <Route path="/menu-items/add" element={<AddIceCream />} exact />
        <Route path="/ice-creams" element={<IceCreams />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
}
