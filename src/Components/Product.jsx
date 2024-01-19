import React from 'react'
import { PiHeart } from "react-icons/pi";
import '../Styles/Bestseller.css'
import { Link } from 'react-router-dom';
function Product({item}) {

  const {name, displayImage, price, _id} = item;
    
  return (
    <div className='product'>
       <Link  to={`/product/${_id}`}>
       <img className="product-image"src={displayImage} />
       </Link>
      <div className='inner-div'>
          <div className='product-description'>{name}</div> 
          {/* <div><button className="btn-fav"> <PiHeart   size="1.5em" /></button></div> */}
      </div> 
      <div> ₹  {price}</div>
    </div>
  )
}

export default Product