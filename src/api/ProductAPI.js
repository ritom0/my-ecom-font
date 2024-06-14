import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductAPI = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      setProducts(res.data.products); // Set the fetched products to the state
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return {
    products: [products, setProducts],
  };
};

export default ProductAPI;    