import React from 'react'
import './cart.css'
import { Link } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import { useAuth } from './authcontext'

const Cart = ({ cart, setCart }) => {


  const removeproduct = (product) => {
    setCart(cart.filter((curElm) => {
      return !(curElm.id === product.id && curElm.size === product.size);
    }));
  };

  const { currentUser } = useAuth();

  const total = cart.reduce((price, item) => price + Number(item.price), 0)
  const tax = (total * 0.07).toFixed(2);
  const loyalty = (total * 0.1).toFixed(2);
  const final = currentUser ? ((total + Number(tax) - loyalty).toFixed(2)) 
  : ((total + Number(tax)).toFixed(2));

  return (
    <div>
      <div className="cart">
        {
          cart.length === 0 &&
          <>
            <div className="empty-cart">
              <h2>Your cart is empty</h2>
              <Link to='/shop'><button>Shop Now</button></Link>
            </div>
          </>
        }
        <div className="container">
          <div className="left">
            {
              cart.map((curElm) => {
                return (
                  <>
                    <div className="box">
                      <div className="img_box">
                        <img src={curElm.image} alt="" />
                      </div>
                      <div className="detail">
                        <div className="info">
                          <h3>{curElm.name}</h3>
                          <p>Price: ${curElm.price}</p>
                          <p>Size: {curElm.size}</p>
                          <p className='remove' onClick={() => removeproduct(curElm)}>remove</p>
                        </div>
                        <div className="icon">
                        </div>
                      </div>
                    </div>
                  </>
                )
              })
            }
          </div>
          <div className="right">
            {
              cart.length > 0 &&
              <div className='right-box'>
                <div className="total">
                  <p>price summary</p>
                  <div className="summary-item">
                    <p className='label'>price:</p>
                    <p className='cost'>${total.toFixed(2)}</p>
                  </div>
                  <div className="summary-item">
                    <p className='label'>shipping:</p>
                    <p className='cost'>free</p>
                  </div>
                  <div className="summary-item">
                    <p className='label'>loyalty discount:</p>
                    <p className='cost'>
                      {currentUser ? (
                        `-$${loyalty}`
                      ) : ('not applied')}
                      </p>
                  </div>
                  <div className="summary-item">
                    <p className='label'>tax:</p>
                    <p className='cost'>${tax}</p>
                  </div>
                  <hr/>
                  <div className="summary-item">
                    <p className='label'>total:</p>
                    <p className='cost'>${final}</p>
                  </div>
                  
                  <p>{!currentUser && ('log in to apply loyalty discount')}</p>
                </div>
                <button onClick>checkout</button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart