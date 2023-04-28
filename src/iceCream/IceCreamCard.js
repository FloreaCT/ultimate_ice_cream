import React from 'react';
// import FocusLink from '../structure/FocusLink';
import IceCreamImage from './iceCreamImage';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const IceCreamCard = ({
  iceCreamId,
  heading,
  to,
  history,
  children,
}) => {
  const navigation = useNavigate();
  const onItemClickHandler = () => {
    navigation(to);
  };

  const onLinkClickHandler = (e) => {
    //This is done to avoid the click handler of the <li>
    //firing and placing two browse entries in browser history
    e.stopPropagation();
  };

  return (
    <section
      onClick={() => {
        onItemClickHandler();
      }}
    >
      <div className="image-container">
        <IceCreamImage iceCreamId={iceCreamId} />
      </div>
      <div className="text-container">
        <h3>
          <NavLink to={to} onClick={onLinkClickHandler}>
            {heading}
          </NavLink>
        </h3>
        {children && <div className="content">{children}</div>}
      </div>
    </section>
  );
};

IceCreamCard.propTypes = {
  iceCreamId: PropTypes.number.isRequired,
  heading: PropTypes.string.isRequired,
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  ]).isRequired,
  children: PropTypes.node,
};

export default IceCreamCard;
