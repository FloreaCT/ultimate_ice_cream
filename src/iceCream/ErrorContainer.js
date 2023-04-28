import React from 'react';
import PropTypes from 'prop-types';

const ErrorContainer = ({ children, errorText, hasSubmitted, errorId }) => {
  ErrorContainer.propTypes = {
    children: PropTypes.node.isRequired,
    errorText: PropTypes.string,
    hasSubmitted: PropTypes.bool.isRequired,
    errorId: PropTypes.string.isRequired,
  };

  return (
    <div className={errorText && hasSubmitted ? 'error' : null}>
      {children}
      <div className="error-wrapper">
        {errorText && hasSubmitted && <span id={errorId}>{errorText}</span>}
      </div>
    </div>
  );
};

export default ErrorContainer;
