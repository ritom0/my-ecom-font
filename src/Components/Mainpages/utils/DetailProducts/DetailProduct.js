import React, { useContext, useEffect, useState } from 'react'
import {  useParams, useNavigate } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'
import { Link } from 'react-router-dom'

const DetailProduct = () => {

    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productAPI.products
    const [detailProduct,setDetailProduct] = useState([])
    const [isLogged] = state.userAPI.isLogged; // Assuming you have an isLogged state
    const navigate = useNavigate();

    useEffect(()=> {
        if(params){
            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            })
        }
    },[params,products])

    if(detailProduct.length === 0) return null

    console.log(detailProduct)

    const handleBuyNow = () => {
      if (isLogged) {
        navigate('/cart');
      } else {
        navigate('/login'); // Redirect to login page if not logged in
      }
    };

  return (
    <div className='detail'>
     <img src={detailProduct.images.url} alt=''/>
      <div className='box-detail'>
        <div className='row'>
          <h2>{detailProduct.title}</h2>
          <h6>{detailProduct.product_id}</h6>

        </div>
        <span>${detailProduct.price}</span>
        <p>{detailProduct.description}</p>
        <p>{detailProduct.content}</p>
        <p>Sold:{detailProduct.sold}</p>
        <button onClick={handleBuyNow} className='cart'>Buy Now</button>
      </div>
    </div>
  )
}

export default DetailProduct
