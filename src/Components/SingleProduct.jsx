import React, { useEffect, useState } from 'react'
import { PiHeart, PiHeartFill } from "react-icons/pi";
import { useParams,Link, useNavigate } from 'react-router-dom';
import '../Styles/SinglePorduct.css'


function SingleProduct({product}) {

  const [WishListItems, settWishListItems] = useState([]);
  const [isWishListed, setIsWishListed] = useState(null);

  const token = sessionStorage.getItem('authToken');
  const navigate = useNavigate();

  const { category } = useParams();

  let stars=0;

 const {name, displayImage, price, } = product;

 //Add to WishList
 const handleAddToWishList = async (productId) => {
  const apiUrl = `https://academics.newtonschool.co/api/v1/ecommerce/wishlist/`;

  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'projectID': 'lb0plw3jgqpa',
    },
    body: JSON.stringify({
      productId: productId,
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();
    console.log(data);
    setIsWishListed(true);
  } catch (error) {
    // Handle errors
    console.error('Error adding item to WishList:', error);
  }
};

function notLoggedIn(){
  window.alert("Login for adding item to WishList!");
 } 

 //WishListed Items

 useEffect(() => {
  getWishListItems();
}, []);

useEffect(() => {
  // Check if the product is in the wishlist when the component mounts
  setIsWishListed(WishListItems.some((item) => item.products._id === product._id));
}, [WishListItems, product]);



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
      
     //console.log(data.data);
      
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
       setIsWishListed(false);
      console.log(`Product with ID ${productId} removed from wishlist successfully.`);
    } else {
      console.error(`Failed to remove product from wishlist. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const handleClick = (productId) => {
  if (isWishListed) {
    removeProductFromWishlist(productId);
  } else {
    handleAddToWishList(productId);
  }
};


  return (
    <div  className="single-product-container">
       <Link  to={`/category/${category}/product/${product._id}`}><img className="single-product-image"src={displayImage} /></Link>
        <div className='single-inner-div'><div>
          <div className='single-product-description'>{name}</div>
          <div className="stars">
         { stars= Math.floor(product.ratings)}
                       {Array(stars)
                         .fill()
                         .map(_ =>(
                         <span>☆</span>
                        ))}
        </div> 
          </div> 
          <div><button 
              className="single-btn-fav"
              onClick={token? ()=>handleClick(product._id): ()=> notLoggedIn()}> 


            {isWishListed ? (
              <PiHeartFill size="1.5em" style={{ color: 'red' }} />
            ) : (
              <PiHeart size="1.5em" />
            )}

              </button></div>
      </div> 
      <div className='single-price' > ₹ {price}</div>
    </div>
  )
}

export default SingleProduct