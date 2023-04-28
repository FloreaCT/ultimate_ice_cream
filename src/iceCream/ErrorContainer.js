import React from 'react';
import PropTypes from 'prop-types';

const ErrorContainer = ({ children, errorText, hasSubmitted }) => {
  ErrorContainer.propTypes = {
    children: PropTypes.node.isRequired,
    errorText: PropTypes.string,
    hasSubmitted: PropTypes.bool.isRequired,
  };

  return (
    <div className={errorText && hasSubmitted ? 'error' : null}>
      {children}
      <div className="error-wrapper">
        {errorText && hasSubmitted && <span>{errorText}</span>}
      </div>
    </div>
  );
};

export default ErrorContainer;
