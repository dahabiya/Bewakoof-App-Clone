import React, { useEffect, useState } from 'react'
import '../Styles/Checkout.css'
import { useNavigate } from 'react-router-dom';

function CheckOut() {

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [totalprice, setTotalprice] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();
  const token = sessionStorage.getItem('authToken');

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

  const clearCart = async () => {
    try {
      const response = await fetch('https://academics.newtonschool.co/api/v1/ecommerce/cart/', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'projectID': 'lb0plw3jgqpa',
        },
      });
      // if (response.ok) {
      //   window.alert("cart cleared")
      // } else {
      //   console.error('Error clearing cart', response.status);
      // }
    } catch (error) {
      console.error('Error clearing cart', error);
    }
  };

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const handleBuyNow = () =>{
    clearCart();
    navigate('/checkoutcompleted')
  }

  const handleAddressClick= (e) =>{
     e.preventDefault();
  }
  return (
    <div className='checkout'>
      <div className='checkout-form-div'>
      <form className='checkout-form mgn'>
        <div  className='checkout-head '>Enter Your Address</div>
        <div className='checkout-line'></div>
        <div className='checkout-form-container'>
        <div className='checkout-div'><input type="text" placeholder='FullName' className='checkout-form-inpt'/></div>
          <div className='checkout-div'> <input type="number" placeholder='Mobile Number' className='checkout-form-inpt'/></div>
          <div className='checkout-div'><input type="number" placeholder='Pin code' className='checkout-form-inpt'/></div>
          <div className='checkout-div'>
           <input type="text" placeholder='City' className='checkout-form-inpt1 city'/>
           <input type="text" placeholder='State' className='checkout-form-inpt1'/>
          </div>
          <div className='checkout-div'><input type="text" placeholder='Flat No/Building, Street name' className='checkout-form-inpt'/></div>
          <div className='checkout-div'><input type="text" placeholder='Landmark(optional)' className='checkout-form-inpt'/></div>
          <button className='checkout-form-btn' onClick={handleAddressClick}>SAVE ADDRESS</button>
        </div>
      </form>
      </div>
      
      <div>
      <div className='checkout-payament-div'>
        <div className='checkout-head '>Payment method</div>
        <div className='checkout-line'></div>

        <div>
      <label className='checkout-radio'>
        <input
          type="radio"
          name="paymentMethod"
          value="cashOnDelivery"
          onChange={handlePaymentMethodChange}
          className='checkout-radio-inpt'
        />
        Cash on Delivery
      </label>
      <br />

      <label className='checkout-radio'>
        <input
          type="radio"
          name="paymentMethod"
          value="debitCreditCard"
          onChange={handlePaymentMethodChange}
          className='checkout-radio-inpt'
        />
        Debit/Credit Card
      </label>
      <br />

      <label className='checkout-radio'>
        <input
          type="radio"
          name="paymentMethod"
          value="upi"
          onChange={handlePaymentMethodChange}
          className='checkout-radio-inpt'
        />
        UPI
      </label>
      <br />

      {selectedPaymentMethod === 'debitCreditCard'  && (
        <div className='payment-debit'>
          <p className='payment-debit-details'>Payment Details:</p>
          <input type="text" placeholder="Card Number" className='payment-debit-details'/>
          <br />
          <input type="text" placeholder="Expiry Date" className='payment-debit-details'/>
          <br />
          <input type="text" placeholder="CVV" className='payment-debit-details'/>
        </div>
      )}

       {selectedPaymentMethod === 'upi' && (
        <div className='payment-debit-upi'>
          <p className='payment-debit-details'> Payment Details:</p>
          <input type="text" placeholder="Enter UPI Id" className='payment-debit-details'/>
          <br />
        </div>
      )}
    </div>

    </div>
    <div className='checkout-buynow-div'>
      <div className='checkout-items'>
      {  
              cartItems.map((item)=>(
                <div key={item._id}>
                  {item.product.name}
                  </div>
                  ))
      }          
      <div  className='checkout-total'> Total  {cartItems.length} items
        <span className='total-span'>Total: ₹{totalprice}</span>
      </div>
      </div>
      <button className='buy-now-btn' onClick={handleBuyNow}>BUY NOW</button>
    </div>
    </div>

    </div>
  )
}

export default CheckOut