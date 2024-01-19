import React, { useState, useEffect } from 'react';
import { useParams, Link} from 'react-router-dom';
import MidNav from './MidNav';
import '../Styles/MidNav.css'
import SingleProduct from './SingleProduct';
import '../Styles/Category.css'


function Category() {
    const [products, setProducts] = useState([]);
    const { category } = useParams();

  //sorting the products
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedRating, setSelectedRating] = useState('All');

  

  useEffect(() => {
    // Fetch products when subcategory changes
    fetchProducts(category);
  }, [category]);

  const fetchProducts = async (selectedSubCategory) => {
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?filter={"subCategory":"${selectedSubCategory}"}`, {
        headers: {
          'projectID': 'lb0plw3jgqpa',
        },
      });
      const data = await response.json();
      setProducts(data.data || []); // Ensure data.data is defined or set an empty array
    } catch (error) {
      console.error(`Error fetching products for subcategory ${selectedSubCategory}:`, error);
    }
  };

  //sorting & filtering the products
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };


  // Sort the products based on the selected sorting order
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  // Filter the sorted products based on the selected rating
  const filteredItems = sortedProducts.filter((product) => (
    selectedRating === 'All' || (product.ratings.toString() >= selectedRating)
  ));
     
    console.log('Filtered Items:', filteredItems);
  return (
    <div>
    <MidNav/>
    <div className='mgn'><Link to="/" className='link'>Home </Link>/ {category}</div>


    <div className='sidebar-container'>
      
      <div className='aside-items'>
      <div className='sort'>SORT BY</div>
          <div className='sidebar-select'>
          <select value={sortOrder} onChange={handleSortChange}>
          <option>Price</option>
          <option className="option" value="asc">Low to High</option>
          <option className="option" value="desc">High to Low</option>
           </select>
          </div>
        
         <div className='sort'>FILTER</div>
         <div className='sidebar-select'>
         <select value={selectedRating} onChange={handleRatingChange}>
          <option value="All">Ratings</option>
          <option value="4">4 stars & Above</option>
          <option value="3">3 stars & Above</option>
          <option value="2">2 stars & Above</option>
        </select>
         </div>  
     </div>

      <div>
      <ul className='category-container'>
          {filteredItems && filteredItems.length > 0 ? (
            filteredItems.map((product) => (
              <SingleProduct key={product._id} product={product} />
            ))
          ) : (
            <li> &nbsp;&nbsp; Sorry..No products available</li>
          )}
        </ul>
    </div>
    </div>
    </div>
  )
}

export default Category