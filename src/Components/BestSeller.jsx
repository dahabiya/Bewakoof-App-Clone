import React, { useState, useEffect } from 'react';
import Product from './Product';
import '../Styles/Bestseller.css'
import { Link } from 'react-router-dom';

function BestSeller() {

    const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseDomain = 'https://academics.newtonschool.co'; 
        const projectId = 'lb0plw3jgqpa'; 

        const response = await fetch(`${baseDomain}/api/v1/ecommerce/clothes/products?sort={"rating":1}&limit=5`, {
          method: 'GET',
          headers: {
            'projectID': projectId,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBestSellers(data.data);
        } else {
          console.error('Error fetching data:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
        <h3 className='head1'>Best Sellers</h3>
      <div >
        
        <ul className='best-seller-container'>
         {bestSellers.map((item) =>(
         <li key={item._id}><Product item={item}/></li>
        ))}
      </ul> 
      
      </div>

    </div>
  )
}

export default BestSeller