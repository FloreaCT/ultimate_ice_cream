import React, { useState, useEffect } from 'react';
import { getMenu } from '../data/iceCreamData';
import { Helmet } from 'react-helmet';
import IceCreamImage from './iceCreamImage';
import LoadingMessage from '../structure/LoadingMessage.';
import { Link, useNavigate } from 'react-router-dom';
import Main from '../structure/Main';

export const Menu = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getMenu().then((menuData) => {
      if (isMounted) {
        setMenu(menuData);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const onItemClickHandler = (to) => {
    navigate(to);
  };

  const onLinkClickHandler = (e) => {
    // This is done to avoid the click handler of <section>
    // firing and placing two browser entries in browser history
    e.stopPropagation();
  };

  return (
    <Main headingText="Rock your taste buds with some ice cream!">
      <LoadingMessage
        loadingMessage={'Loading Menu'}
        isLoading={isLoading}
        doneMessage="Loading menu complete"
      />
      {menu.length > 0 ? (
        <ul className="container">
          {menu.map(
            ({ id, iceCream, price, description, inStock, quantity }) => (
              <li key={id.toString()}>
                <section
                  className="card"
                  onClick={() => {
                    onItemClickHandler(`/menu-items/${id.toString()}`);
                  }}
                >
                  <div className="image-container">
                    <IceCreamImage iceCreamId={iceCream.id} />
                  </div>
                  <div className="text-container">
                    <h3>
                      <Link
                        to={`/menu-items/${id.toString()}`}
                        onClick={onLinkClickHandler}
                      >
                        {iceCream.name}
                      </Link>
                    </h3>
                    <div className="content card-content">
                      <p className="price">${price.toFixed(2)}</p>
                      <p className={`stock${inStock ? '' : '-out'}`}>
                        {inStock
                          ? `${quantity} in stock`
                          : ' Currently out of stock'}
                      </p>
                      <p className="description">{description}</p>
                    </div>
                  </div>
                </section>
              </li>
            )
          )}
        </ul>
      ) : (
        !isLoading && (
          <p className="empty-menu">The children ate all the Ice Cream!!! </p>
        )
      )}
    </Main>
  );
};
