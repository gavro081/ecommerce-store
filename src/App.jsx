import React, { useState } from "react";
import Nav from "./components/nav";
import {BrowserRouter, useSearchParams} from 'react-router-dom'
import Rout from "./components/rout";
import Footer from "./components/footer";
import allProducts from "./components/home_products";
import Home from "./components/home";

const App = () => {

const [cart, setCart] = useState([])
const [shop, setShop] = useState(allProducts)
const [search, setSearch] = useState('')

const Filter = (x,y) => {
  const catefilter = allProducts.filter((product) => {
    return product[y] === x
  })
  setShop(catefilter)

}

const FilterArr = (filters) => {
  const { brand, size } = filters;
  
  const catefilter = allProducts.filter((product) => {
    const matchesBrand = brand.length === 0 || brand.includes(product.brand);
    const matchesSize = size.length === 0 || product.size.some((item) => size.includes(item));

    return matchesBrand && matchesSize;
  });

  setShop(catefilter);
};



const allcatefilter = () => {
  setShop(allProducts)
}

const searchlength = (search || []).length === 0
const searchproduct = () => {
if (searchlength){
  alert("Please search something.")
  setShop(allProducts)
}
else {
    const searchfilter = allProducts.filter((x) => {
      return x.cat === search
    })
    setShop(searchfilter)
  }
}

const addtocart = (product, selectedSize) => {
  const exist = cart.find((x) => {
    return x.id === product.id 
    && x.size === selectedSize
  })
  if (!selectedSize) {
    return {message: "Please pick a size", product:null};
  }
  if (exist) {
    return { message: "Item is already in cart", product: null};
  }
  else {
    setCart([...cart, {...product, size: selectedSize}]);
    return { message: "Product added to cart", product: {name: product.name, size: selectedSize} };
  }
}
return (
  <>
  <BrowserRouter>
  <Nav search={search} setSearch={setSearch} searchproduct={searchproduct}/>
  <Rout setCart={setCart} cart={cart} shop={shop} Filter={Filter} FilterArr={FilterArr} allcatefilter={allcatefilter} addtocart={addtocart}/>
  <Footer />
  </BrowserRouter>
  </>
  )
}

export default App