import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

const LoadingMessage = ({ loadingMessage, doneMessage, isLoading }) => {
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);
  const [showDoneMessage, setShowDoneMessage] = useState(false);
  const isLoadingPreviousValue = useRef(null);

  useLayoutEffect(() => {
    let loadingMessageDelay;
    let doneMessageDelay;

    if (isLoading) {
      loadingMessageDelay = setTimeout(() => {
        setShowLoadingMessage(true);
      }, 400);
    } else {
      if (isLoadingPreviousValue.current) {
        setShowDoneMessage(true);
        doneMessageDelay = setTimeout(() => {
          setShowDoneMessage(false);
        }, 300);
      }
    }

    isLoadingPreviousValue.current = isLoading;

    return () => {
      setShowLoadingMessage(false);
      setShowDoneMessage(false);
      clearTimeout(loadingMessageDelay);
      clearTimeout(doneMessageDelay);
    };
  }, [isLoading]);
  // return (
  //   <div aria-live="assertive" aria-atomic="true">
  //     {showLoadingMessage && <p className="loading">{loadingMessage}</p>}
  //     {showDoneMessage && <p className="visually-hidden">{doneMessage}</p>}
  //   </div>
  // );
};
LoadingMessage.propTypes = {
  loadingMessage: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  doneMessage: PropTypes.string.isRequired,
};

export default LoadingMessage;
