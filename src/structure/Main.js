import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';

const Main = ({ children, headingText, headingLevel = 2 }) => {
  const heading = useRef(null);
  const H = `h${headingLevel}`;

  useEffect(() => {
    heading.current.focus();
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <Helmet>
        <title>{headingText} | Ultimate Ice Cream</title>
      </Helmet>
      <H className="main-heading" ref={heading} tabIndex="-1">
        {headingText}
      </H>
      {children}
    </main>
  );
};

export default Main;
