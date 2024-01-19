import React, { useState, useEffect } from 'react';
import '../Styles/Allcategories.css'
import { Link } from 'react-router-dom';


function Allcategories() {
    const [categories, setCategories] = useState([]);
    const apiUrl = 'https://academics.newtonschool.co/api/v1/ecommerce/clothes/categories';
    const headers = {
      projectId: 'lb0plw3jgqpa'
    };
  
    useEffect(() => {
      // Fetch categories from the API
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

  return (
    <div className='category-div'>
        <h3  className='head2'>All Categories</h3>
        <div className='category-container'>
        {categories.map((category, index) => (
            <div id='category-container-items'>
                <button className='cat-btn'>
                <Link to={`/category/${category}`}>{category}</Link>
                </button>
            </div> 
            ))}
        </div>
    </div>
  )
}

export default Allcategories