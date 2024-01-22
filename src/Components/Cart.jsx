import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import '../Styles/AddToCart.css'

function Cart() {

  const [cartItems, setCartItems] = useState([]);
  const [totalprice, setTotalprice] = useState(0);

  const token = sessionStorage.getItem('authToken');
  const navigate = useNavigate();


  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    try {
      const response = await fetch('https://academics.newtonschool.co/api/v1/ecommerce/cart', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'projectID': 'lb0plw3jgqpa',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTotalprice(data.data.totalPrice);
        setCartItems(data.data.items);
        console.log(data.data);
        
      } else {
        console.error('Error fetching cart items');
      }
    } catch (error) {
      console.error('Error fetching cart items', error);
    }
  };

  const removeItemFromCart = async (productId) => {
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/cart/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'projectID': 'lb0plw3jgqpa',
        },
      });

      if (response.ok) {
        getCartItems();
      } else {
        console.error('Error removing item from cart:', response.status);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };


  return (
    <>
        
        {token?
        <div> 

         <div className="navv"><Link to='/'>
                <img className='bewakoof-logo' src='/images/bewakoof.jpg' alt="Bewakoof-Logo"/></Link>
                </div>
          
          {
            cartItems.length === 0?

            <>
                <h3 className="empty">Cart Is Empty...</h3>
            </>

            :

            <div>
                
                <h2  className='heading'>Your Cart</h2>
            {  
              cartItems.map((item)=>(
                <div key={item._id} className='grid-container'>

                  <span><img className="cart-image"src={item.product.displayImage} /></span>
                  <span>{item.product.name}</span>
                  <span>₹ {item.product.price}</span>
                  <span>
                    <button 
                    className='addtocart-btn'
                    onClick={() => removeItemFromCart(item.product._id)}>
                    Remove Item</button></span>
                </div>   
              ))
            }
            <div className='total'>Total: ₹ {totalprice}
                <Link to='/checkout'><button className='chck-out-btn'>CheckOut</button></Link> 
                </div>
            </div>
          }
          
        </div>
        :
        <div>  
            <dialog open className='c-dialog'>
            <p className='c-dialog-p'>Login for Viewing the cart</p>
            <form method="c-dialog" >
            <button onClick={() => navigate('/signin')} className='c-dialog-btn btn1'>Login</button>
            <button onClick={() => navigate('/')} className='c-dialog-btn btn2'>Close</button>
           </form>
            </dialog>
        </div>}
    </>
  )
}

export default Cart
