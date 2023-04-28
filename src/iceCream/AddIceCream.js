import React, { useEffect, useState } from 'react';
import Main from '../structure/Main';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingMessage from '../structure/LoadingMessage.';
import IceCream from './IceCream';
import { getIceCream, postMenuItem } from '../data/iceCreamData';

const AddIceCream = ({}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [iceCream, setIceCream] = useState({});
  const navigation = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const iceCreamId = searchParams.get('iceCreamId');

  useEffect(() => {
    let isMounted = true;
    getIceCream(iceCreamId)
      .then((iceCreamResponse) => {
        if (isMounted) {
          setIceCream(iceCreamResponse);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 404 && isMounted) {
          navigation('/', { focus: true });
        }
      });
    return () => {
      isMounted = false;
    };
  }, [navigation, iceCreamId]);

  const onSubmitHandler = (menuItem) => {
    postMenuItem(menuItem).then((res) => {
      navigation('/', { focus: true });
    });
  };

  return (
    <Main headingText="Add some goodness to the menu">
      <LoadingMessage
        loadingMsg="Loading ice cream."
        doneMsg="Ice cream loaded."
        isLoading={isLoading}
      />
      {!isLoading && (
        <IceCream iceCream={iceCream} onSubmit={onSubmitHandler} />
      )}
    </Main>
  );
};

export default AddIceCream;
