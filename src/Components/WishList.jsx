import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { PiHandbagSimpleLight,   PiHeartFill } from "react-icons/pi";

import '../Styles/WishList.css'

function WishList() {

  const [WishListItems, settWishListItems] = useState([]);

  const token = sessionStorage.getItem('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    getWishListItems();
  }, []);

  const getWishListItems = async () => {
    try {
      const response = await fetch('https://academics.newtonschool.co/api/v1/ecommerce/wishlist/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'projectID': 'lb0plw3jgqpa',
        },
      });

      if (response.ok) {
        const data = await response.json();
        settWishListItems(data.data.items);
        console.log(data.data);
        
      } else {
        console.error('Error fetching cart items');
      }
    } catch (error) {
      console.error('Error fetching cart items', error);
    }
  };

  //Removing from WishList

  const removeProductFromWishlist = async (productId) => {
    const url = `https://academics.newtonschool.co/api/v1/ecommerce/wishlist/${productId}`;
  
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'projectID': 'lb0plw3jgqpa',
        },
      });
  
      if (response.ok) {
        const updatedWishListItems = WishListItems.filter(item => item.products._id !== productId);
         settWishListItems(updatedWishListItems);
        console.log(`Product with ID ${productId} removed from wishlist successfully.`);
      } else {
        console.error(`Failed to remove product from wishlist. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  //Add to Cart

  const handleAddToCart = async (productId) => {
    const apiUrl = `https://academics.newtonschool.co/api/v1/ecommerce/cart/${productId}`;

    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'projectID': 'lb0plw3jgqpa',
      },
      body: JSON.stringify({
        quantity: '1',
        size: "S", 
      }),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();
      window.alert("item Added to Cart");
      console.log(data);
    } catch (error) {
      // Handle errors
      console.error('Error adding item to cart:', error);
    }
  };


    return (
      <>
          {token?
          <div>
               <div className="navv"><Link to='/'>
                      <img className='bewakoof-logo' src='/images/bewakoof.jpg' alt="Bewakoof-Logo"/></Link>
                </div>
               {  WishListItems.length === 0?
                  <>
                    <h3 className="empty">Your Bag Is Empty...</h3>
                  </>
               :
                  <div>

                      <h2  className='heading'>Wishlisted Items</h2>

                      <div className='Witems'>
                      { WishListItems.map((item)=>(
                         <div key={item.products._id} className='Witems-container'>
                          <img className="Wproduct-image"src={item.products.displayImage} />
                       <div className='Winner-div'>
                       <div className='Wproduct-description'>{item.products.name}</div> 
                       {/* <div><button 
                            className="Wbtn-fav" onClick={() => 
                            removeProductFromWishlist(item.products._id)}> x
                       <PiHeartFill  size="1.5em" style={{ color: 'red' }}/>
                       </button></div> */}
                       <div className='Wprice'>₹{item.products.price}</div>
                       </div> 
                        
                        <button className='W-btn'
                           onClick={() => removeProductFromWishlist(item.products._id)}> 
                           {/* <div className='W-btn-1'><PiHandbagSimpleLight size="1.6em"/></div> */}
                           <div className='W-btn-1'>Remove from Wishlist</div>
                        </button>
                        <button className='W-btn'
                           onClick={() => handleAddToCart(item.products._id)}> 
                           <div className='W-btn-1'><PiHandbagSimpleLight size="1.6em"/></div>
                           <div className='W-btn-2'>ADD TO BAG</div>
                        </button>
                    </div>
                    ))
                    }
                      </div>
                    
                  </div>
               }
          </div>
          :
          <div>  
            <dialog open className='dialog'>
            <p className='dialog-p'>Login for Viewing the Wishlisted Items</p>
            <form method="dialog" >
            <button onClick={() => navigate('/signin')} className='dialog-btn btn1'>Login</button>
            <button onClick={() => navigate('/')} className='dialog-btn btn2'>Close</button>
           </form>
            </dialog>
        </div>
        }
      </>
    )
}

export default WishList
