import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import ProductList from '../utils/ProductList/ProductList';

const Product = () => {
  const state = useContext(GlobalState);

  // Ensure state and state.productAPI are defined
  if (!state || !state.productAPI) {
    return <div>Loading...</div>;
  }

  const [products] = state.productAPI.products;

  // Ensure products array is defined
  if (!products || products.length === 0) {
    return <div>Loading...</div>;
  }

  const [isAdmin] = state.userAPI.isAdmin

  console.log(state);

  return (
    <div className='products'>
      {products.map((product) => (
        <ProductList key={product._id} product={product} isAdmin={isAdmin}/>
      ))}
    </div>
  );
};

export default Product;

