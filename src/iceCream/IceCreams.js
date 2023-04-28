import React, { useEffect, useState } from 'react';
import Main from '../structure/Main';
import LoadingMessage from '../structure/LoadingMessage.';
import IceCreamCard from './IceCreamCard';
import IceCreamCardContainer from './IceCreamCardContainer';
import { getIceCreams } from '../data/iceCreamData';
import PropTypes from 'prop-types';

const IceCreams = ({ history }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [iceCreams, setIceCreams] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getIceCreams().then((iceCreams) => {
      if (isMounted) {
        setIceCreams(iceCreams);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Main headingText="Choose your poison and enjoy!">
      <LoadingMessage
        loadingMsg="Loading the stock list."
        doneMsg="Loading stock list complete."
        isLoading={isLoading}
      />
      {iceCreams.length > 0 ? (
        <IceCreamCardContainer>
          {iceCreams.map(({ id, name }) => (
            <IceCreamCard
              key={id}
              iceCreamId={id}
              heading={name}
              to={{
                pathname: '/menu-items/add',
                search: `?iceCreamId=${id.toString()}`,
              }}
              history={history}
            />
          ))}
        </IceCreamCardContainer>
      ) : (
        !isLoading && <p>Your menu is fully stocked!</p>
      )}
    </Main>
  );
};

IceCreams.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default IceCreams;
