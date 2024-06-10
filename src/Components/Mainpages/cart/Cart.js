import React, { useContext, useEffect } from 'react';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';

const Cart = () => {
  const state = useContext(GlobalState);
  const [cart] = state.userAPI.cart;

  useEffect(() => {
    console.log('Cart data:', cart);
  }, [cart]);
  

  if (cart.length === 0)
    return <h2 style={{ textAlign: 'center', fontSize: '5rem' }}>Cart Empty</h2>;

  return (
    <div>
      {cart.map((productItem, index) => {
        console.log('Product item:', productItem);
        const { images, title, product_id, price, description, content, sold } = productItem;
        if (!images || !images.url) {
          return (
            <div key={index} className="detail">
              <h2 style={{ color: 'red' }}>Product data is missing</h2>
            </div>
          );
        }

        return (
          <div key={index} className="detail">
            <img src={images.url} alt="" />
            <div className="box-detail">
              <div className="row">
                <h2>{title}</h2>
                <h6>{product_id}</h6>
              </div>
              <span>${price}</span>
              <p>{description}</p>
              <p>{content}</p>
              <p>Sold: {sold}</p>
              <Link to="/cart" className="cart">Buy Now</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;


