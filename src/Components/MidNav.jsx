import React, { useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom'
import { PiHeart , PiBagLight } from "react-icons/pi";
import {TfiSearch } from "react-icons/tfi";

import '../Styles/MidNav.css'
import { useUser} from '../Provider/UserProvider';
function MidNav() {
  
  const [categories, setCategories] = useState([]);

  const { setUserContext: signOutContext,
    isUserLoggedIn } = useUser();
   const navigate = useNavigate();

   let loginUsername = sessionStorage.getItem('userInfo');

  //fetch Category
  const apiUrl = 'https://academics.newtonschool.co/api/v1/ecommerce/clothes/categories';
  const headers = {
    projectId: 'lb0plw3jgqpa'
  };

  useEffect(() => {
    
    const fetchCategories = async () => {
      try {
        const response = await fetch(apiUrl, { headers });
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error('Failed to fetch categories from the API.', error);
      }
    };

    fetchCategories();
  }, []);

  //SignOut Function

  function handleSignOut() {
    sessionStorage.removeItem('userInfo');

    sessionStorage.removeItem('authToken');
    signOutContext();
    navigate('/signin')
}

useEffect(() => {
    signOutContext(loginUsername)
}, [])


  return (
    <div className='maindiv2'>
        <div className="left-elements"><Link to='/'>
        <img className='bewakoof-logo' src='public/bewakoof.jpg' alt="Bewakoof-Logo"/></Link>
        </div>

        <div className="dropdown left-elements padng">
         <button className="dropbtn">ALL CATEGORIES</button>
         <div className="dropdown-content">
         {categories.map((category, index) => (
              <Link to={`/category/${category}`}>{category}</Link>
            ))}
        </div>
        </div>

        {/* <div className="dropdown left-elements padng">
         <button className="dropbtn">WOMEN</button>
         <div className="dropdown-content">
         {categories.map((category, index) => (
              <Link to={`/category/${category}`}>{category}</Link>
            ))}
        </div>
        </div> */}

        <div className="left-elements padng link">MOBILE COVERS</div>

        <div className="right-elements">
            <span className='searchspan'>{< TfiSearch/>}</span>
            <input className="searchbox"type="text" placeholder="  Search by product, category or collection"/>
        </div>
        <div className='line'></div>
        <div className="right-elements padng">

        {isUserLoggedIn? (
                        <button className='link login-btn' onClick={handleSignOut} >LogOut</button>
                    ) : (
                        <button className='link login-btn' onClick={() => navigate('/signin')} >Login</button>
                    )}

        {/* <Link to='/signin' className='link'>Login</Link> */}

        </div>
        <div className="right-elements padng "> 
            <Link to='/wishlist'  className='link'><PiHeart  size="1.5em"/></Link> 
        </div>
        <div className="right-elements padng ">
            <Link to='/cart' className='link'> <PiBagLight size="1.5em"/></Link>
        </div>
   
    </div>
  )
}

export default MidNav
