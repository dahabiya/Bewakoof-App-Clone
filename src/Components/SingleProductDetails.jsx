import React, { useEffect, useState } from 'react';
import { useParams , Link} from 'react-router-dom';
import '../Styles/SingleProductDetails.css'
import MidNav from './MidNav';

function SingleProductDetails() {

    const [products, setProducts] = useState(null);

    const { category, productId } = useParams();
    const token = sessionStorage.getItem('authToken');


    let stars=0;

      useEffect(() => {
        
        fetchProducts(productId);
      }, [productId]);

      const fetchProducts = async (productId) => {
        try {
          const response = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/product/${productId}`, {
            headers: {
              'projectID': 'lb0plw3jgqpa',
            },
          });
          const data = await response.json();
          setProducts(data.data); 

        } catch (error) {
          console.error(`Error fetching product details ${productId}:`, error);
        }
      };  

      const handleAddToCart = async () => {
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

      const handleAddToWishList = async () => {
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
        } catch (error) {
          // Handle errors
          console.error('Error adding item to WishList:', error);
        }
      };


      function notLoggedIn(){
            window.alert("Login for adding items to cart!");
           } 
        
  return (
    <div>

    <MidNav/>

    <div className='mgn'>
          <Link to="/" className='link'>Home </Link> &nbsp; / &nbsp;
          {/* <Link to={category} className='link'>{category}</Link> &nbsp; / &nbsp; */}
                  Product Details
    </div>

    <ul>
        {products ? (
            <div className='details-container'>

              <div className='div2'>
                  <img className="details-img" src={products.displayImage} alt="Product Image" />
              </div>

              <div className='product-details'>

                <div className='div3'>Bewakoof®</div>
                <div>{products.name}</div>
                <div>  
                  { stars= Math.round(products.ratings)}
                       {Array(stars)
                         .fill()
                         .map(_ =>(
                         <span>⭐️</span>
                        ))}
                </div>
                <div> ₹ {products.price}</div>
                <div>{products.description.replace(/<[^>]*>?/gm, '')}</div>
                <div>

                    <button 
                         className="details-btn cart" 
                         onClick={token? handleAddToCart: ()=> notLoggedIn()}>  
                         ADD TO BAG  
                    </button>

                    <button 
                       className="details-btn wishlist"
                       onClick={token? handleAddToWishList: ()=> notLoggedIn()}>
                        WISHLIST
                    </button>
                    
                </div>
              </div>
            </div>
        ) : (
          <li>
            can't show the Details now!</li>
        )}
    </ul>
    </div>
  )
}

export default SingleProductDetails

