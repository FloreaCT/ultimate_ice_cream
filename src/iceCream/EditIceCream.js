import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getMenuItem, putMenuItem } from '../data/iceCreamData';
import PropTypes from 'prop-types';
import LoadingMessage from '../structure/LoadingMessage.';
import '../assets/css/formsSpacers.css';
import IceCreamImage from './iceCreamImage';
import useUniqueIds from '../hooks/useUniqueIds';
import Main from '../structure/Main';

export const EditIceCream = () => {
  const isMounted = useRef(false);
  const [menuItem, setMenuItem] = useState({
    price: '0.00',
    inStock: true,
    quantity: '0',
    description: '',
    iceCream: {
      id: '0',
      name: '',
    },
  });
  const navigation = useNavigate();
  const { menuItemId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [descriptionId, stockId, quantityId, priceId] = useUniqueIds(4);
  console.log(descriptionId);
  useEffect(() => {
    return () => {
      isMounted.current = true;
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);

    getMenuItem(menuItemId)
      .then(({ id, price, inStock, quantity, description, iceCream }) => {
        if (isMounted.current) {
          setMenuItem({
            id,
            price: price.toFixed(2),
            inStock,
            quantity: quantity.toString(),
            description,
            iceCream,
          });
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 404 && !isMounted.current) {
          navigation('/');
          navigation('/', { replace: true });
        }
      });
  }, [menuItemId, navigation]);

  EditIceCream.propTypes = {
    menuItemId: PropTypes.number.isRequired,
  };

  const onChangeHandler = (e) => {
    let newMenuItemData = {
      ...menuItem,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    };
    if (e.target.name === 'quantity') {
      newMenuItemData.inStock = e.target.value !== '0';
    }
    if (e.target.name === 'inStock' && !e.target.checked) {
      newMenuItemData.quantity = '0';
    }
    setMenuItem(newMenuItemData);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const { id, price, inStock, quantity, description, iceCream } = menuItem;

    const submitItem = {
      id,
      iceCream: { id: iceCream.id },
      price: parseFloat(price),
      inStock,
      quantity: parseInt(quantity),
      description,
    };

    putMenuItem(submitItem).then(() => {
      navigation('/');
    });
  };
  return (
    <Main headingText="Update the IceCream">
      <LoadingMessage
        loadingMessage="Loading ice cream"
        doneMessage="Ice cream loaded"
        isLoading={isLoading}
      />
      {!isLoading && (
        <div className="formFrame">
          <div className="image-container">
            <IceCreamImage iceCreamId={parseInt(menuItemId)} />
          </div>
          <div className="form-container">
            <dl>
              <dt>Name :</dt>
              <dd>{menuItem.iceCream.name}</dd>
            </dl>
            <form onSubmit={onSubmitHandler}>
              <label htmlFor={descriptionId}>Description</label>
              <textarea
                id={descriptionId}
                name="description"
                rows="3"
                value={menuItem.description}
                onChange={onChangeHandler}
              />
              <label htmlFor={stockId}>In stock?</label>
              <input
                id={stockId}
                type="checkbox"
                name="inStock"
                checked={menuItem.inStock}
                onChange={onChangeHandler}
              ></input>
              <label htmlFor={quantityId}>Quantity</label>
              <select
                id={quantityId}
                name="quantity"
                value={menuItem.quantity}
                onChange={onChangeHandler}
              >
                <option value="0">0</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
              <label htmlFor={[priceId]}>Price :</label>
              <input
                id={priceId}
                type="number"
                step="0.01"
                name="price"
                value={menuItem.price}
                onChange={onChangeHandler}
              />
              <div className="button-container">
                <button className="ok" type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Main>
  );
};
