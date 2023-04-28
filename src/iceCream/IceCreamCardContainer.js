import React from 'react';
import PropTypes from 'prop-types';

const IceCreamCardContainer = ({ children }) => (
  <ul>
    {React.Children.map(children, (card) => (
      <li>{card}</li>
    ))}
  </ul>
);

IceCreamCardContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IceCreamCardContainer;
