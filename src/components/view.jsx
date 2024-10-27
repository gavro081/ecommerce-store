import React, { useTransition } from 'react'
import { Route, Routes } from 'react-router'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import allProducts from './home_products';
import Toast from './toast'
import './view.css'

const View = ({ addtocart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [toastMessage, setToastMessage] = useState(""); 
  const [toastProduct, setToastProduct] = useState(null); 

  useEffect(() => {
    const selectedProduct = allProducts.find((prod) => prod.id === id);
    setProduct(selectedProduct);
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handleSizeClick = (size) => {
    if (product.size.includes(size))
    setSelectedSize(size);
  }

  const handleAddToCart = () => {
    const result = addtocart(product, selectedSize);
    setToastMessage(result.message);
    setToastProduct(result.product);
    setShowToast(true);
  }

  const toastLink = toastProduct ? '/cart' : '';

  const allSizes = Array.from({ length: 12 }, (_, i) => 37 + i);

  return (
    <div className='view'>
      <div className="container">
        <img className='product-img' src={`/${product.image}`} alt='' />
        <div className="product-info">
          <h1>{product.name}</h1>
          <p>${product.price}</p>
          <p>{product.brand}</p>

          <div className="sizes">
            {allSizes.map(size => (
              <div
                key={size}
                className={`size ${(selectedSize === size) ? 'selected' : ''} ${product.size.includes(size) ? 'available' : 'unavailable'}`}
                onClick={() => handleSizeClick(size)}
              >
                {size}
              </div>
            ))}
          </div>
          <button
            onClick={handleAddToCart}
            className='btn'
            // disabled={!selectedSize}
          >Add to cart</button>
        </div>
      </div>
      <Toast
        message={`${toastMessage}${toastProduct ? `\n${toastProduct.name}\nSize: ${toastProduct.size}` : ''}`}
        show={showToast}
        onClose={() => setShowToast(false)}
        link={toastLink}
      />
    </div>
  )
}

export default View;