import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Main from '../structure/Main';
import IceCream from './IceCream';
import { getMenuItem, putMenuItem, deleteMenuItem } from '../data/iceCreamData';
import PropTypes from 'prop-types';
import LoadingMessage from '../structure/LoadingMessage.';

export const EditIceCream = ({}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [menuItem, setMenuItem] = useState({});
  const navigation = useNavigate();
  const params = useParams();

  useEffect(() => {
    let isMounted = true;
    getMenuItem(params.menuItemId)
      .then((item) => {
        if (isMounted) {
          setMenuItem(item);
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
  }, [params.menuItemId, navigation]);

  const onSubmitHandler = (updatedItem) => {
    putMenuItem({ id: menuItem.id, ...updatedItem }).then(() => {
      navigation('/', { focus: true });
    });
  };

  const onDeleteHandler = () => {
    deleteMenuItem(params.menuItemId).then(() => {
      navigation('/', { focus: true });
    });
  };

  return (
    <Main headingText="Update this beauty">
      <LoadingMessage
        loadingMsg="Loading ice cream."
        doneMsg="Ice cream loaded."
        isLoading={isLoading}
      />
      {!isLoading && (
        <IceCream
          {...menuItem}
          onDelete={onDeleteHandler}
          onSubmit={onSubmitHandler}
        />
      )}
    </Main>
  );
};
