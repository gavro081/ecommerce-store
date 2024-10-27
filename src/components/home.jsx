import React, { useEffect, useState } from 'react'
import './home.css'
import { Link, useNavigate } from 'react-router-dom'
import allProducts from './home_products'
import { AiFillEye, AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BiLogoFacebook, BiLogoTwitter, BiLogoInstagram, BiLogoYoutube } from "react-icons/bi";
const Home = ({ addtocart }) => {
  // Product category
  const [newProduct, setNewProduct] = useState([])
  const [featuredProduct, setFeaturdProduct] = useState([])
  const [topProduct, setTopProduct] = useState([])
  //Tranding Product
  const [trendingProduct, setTrendingProduct] = useState(allProducts)
  // Filter of trending product
  const filtercate = (x) => {
    const filterproduct = allProducts.filter((curElm) => {
      return curElm.type === x
    })
    setTrendingProduct(filterproduct)
  }

  //All Trending Product
  const allTrendingProduct = () => {
    setTrendingProduct(allProducts)
  }

  const navigate = useNavigate();

  const handleProductView = (productID) => {
    navigate(`/view/${productID}`);
  };

  return (
    <>
      <div className='home'>
        <div className='container'>
          <div className="articles">
            {/* <h1>Articles</h1> */}
            <div className="article-box">
              <div className="article">
                <img src='metaspeed-article.webp' className='picture'></img>
                <h3 className="title">asics metaspeed sky paris</h3>
                <p className='text'>The METASPEED™ SKY PARIS racing shoes are built for stride-style runners aiming to start fast and finish faster. With an energetic midsole foam and propulsive carbon plate, they help lengthen strides and conserve energy. The lighter design and FF TURBO™ PLUS cushioning enhance compression, making it easier to maintain speed and push through the 30km mark.</p>
                {/* <button className='btn'>buy now</button> */}
                <a className='link' onClick={() => handleProductView(11)}>check availability</a>
              </div>
              <div className="article">
                <img src='alphafly-article.jpg' className='picture'></img>
                <h3 className="title">nike alphafly 3</h3>
                <p className='text'>with the newest nike alphafly 3, three innovative technologies help power your run: A double dose of Air Zoom units helps launch you into your next step; a full-length carbon fiber plate helps propel you forward with ease; and a heel-to-toe ZoomX foam midsole helps keep you fresh from start to 26.2. Time to leave your old personal records in the dust.</p>
                {/* <button className='btn'>buy now</button> */}
                <a className='link' onClick={() => handleProductView(1)}>check availability</a>
              </div>
              <div className="article">
                <img src='hyperion4-article.png' className='picture'></img>
                <h3 className="title">brooks hyperion elite 4</h3>
                <p className='text'>the brooks Hyperion Elite 4 road-racing shoes are designed to help you chase down PRs in any distance. New, lighter cushioning is layered high to absorb impact while the carbon fiber propulsion plate helps propel you forward. Combined, these elements work together to deliver a smooth, ultralight ride to get you from start to finish in record time.</p>
                <a className='link' onClick={() => handleProductView(14)}>check availability</a>
              </div>
            </div>
          </div>
          <div className="products">
            <a href="/shop">shop now</a>
            <div className='products-box'>
              {
                trendingProduct.map((curElm, index) => {
                  if (index % 2 === 0) return (
                    <>
                      <div className='box'>
                        <div className='img_box'>
                          <img src={curElm.image} alt=''></img>
                        </div>
                        <div className='info'>
                          <p>{curElm.brand}</p>
                          <p>{curElm.name}</p>
                          <p>${curElm.price}</p>
                          <p onClick={() => handleProductView(curElm.id)}>view</p>
                        </div>
                      </div>
                    </>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home