import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './home'
import Shop from './shop'
import Cart from './cart'
import Contact from './contact'
import View from './view'
import Login from './login';
import Register from './register';
import About from './about'

const Rout = ({shop, Filter, FilterArr, allcatefilter, addtocart, cart, setCart}) => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home addtocart={addtocart}/>}/>
        <Route path='/cart' element={<Cart cart={cart} setCart={setCart}/>} />
        <Route path='/about' element={<About />}></Route>
        <Route path='/view/:id' element={<View addtocart={addtocart}/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='shop' element={<Shop shop={shop} Filter={Filter} FilterArr={FilterArr} allcatefilter={allcatefilter} addtocart={addtocart}/>}/>
        <Route path='/contact' element={<Contact />} />
    </Routes>
    </>
  )
}

export default Rout