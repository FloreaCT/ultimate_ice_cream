import { PropTypes } from 'prop-types';
import React from 'react';

const iceCreamImage = ({ iceCreamId }) => {
  return (
    iceCreamId != null && (
      <img
        src={`${
          process.env.PUBLIC_URL
        }/ice-cream-images/ice-cream-${iceCreamId.toString()}.svg`}
        alt=""
      />
    )
  );
};

iceCreamImage.propTypes = {
  iceCreamId: PropTypes.number,
};

export default iceCreamImage;
