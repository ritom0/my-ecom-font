import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './products.css';

const BtnRender = ({ product }) => {
  const state = useContext(GlobalState);
  const navigate = useNavigate();

  if (!state || !state.productAPI) {
    return <div>Loading...</div>;
  }

  const [products, setProducts] = state.productAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [isLogged] = state.userAPI.isLogged; 
  const addCart = state.userAPI.addCart;

  const deleteProduct = async () => {
    try {
      const deleteConfirmation = window.confirm("Are you sure you want to delete this product?");
      if (!deleteConfirmation) return;

      await axios.delete(`/api/products/${product._id}`, {
        headers: { Authorization: localStorage.getItem('token') }
      });

      setProducts(products.filter(p => p._id !== product._id));
      alert('Product has been deleted successfully.');
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleBuyNow = () => {
    if (isLogged) {
      addCart(product);
      navigate('/cart'); // Redirect to cart page
    } else {
      navigate('/login'); // Redirect to login page if not logged in
    }
  };

  return (
    <div className='row_btn'>
      {isAdmin ? (
        <>
          <button id='btn_delete' onClick={deleteProduct}>
            Delete
          </button>
          <Link id='btn_edit' to={`/edit_product/${product._id}`}>
            Edit
          </Link>
        </>
      ) : (
        <>
          <button id='btn_buy' onClick={handleBuyNow}>
            Buy Now
          </button>
          <Link id='btn_view' to={`/detail/${product._id}`}>
            View
          </Link>
        </>
      )}
    </div>
  );
};

export default BtnRender;
