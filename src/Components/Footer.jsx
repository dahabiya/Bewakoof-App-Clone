import React from 'react'
import '../Styles/Footer.css'
function Footer() {
  return (
    <div className='footer'>
        
        <ul className='footer-container'>

            <div className='grid-item'>
               <div className='grid-head'>Customer service</div>
            <li>Contact Us</li>
            <li>Track Order</li>
            <li>Return Order</li>
            <li>Cancel Order</li>
            </div>
          
            <div className='grid-item'>
            <div className='grid-head'> About Company</div>
            <li>About Us</li>
            <li>We're Hiring</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            </div>
            
            <div className='grid-item'>
            <div className='grid-head'> Connect With Us</div>
            <li>4.7M People Like This</li>
            <li>1M followers</li>
            <li>Twitter</li>
            </div>
            
            <div className='grid-item'>
            <div className='grid-head'>Keep Up To Date</div>
            <li>enter email</li>
            <li>Subscribe</li>
            </div>
            
            <div className='grid-item'>
            <li>15 days Return Policy*</li>
            <li>Cash On Delivery*</li>
            </div>

            <div className='grid-item'>
            <div className='grid-head'> Download The App</div>
            <li>Play Store</li>
            <li>App Store</li>
            </div>   

        </ul>
    </div>
  )
}

export default Footer