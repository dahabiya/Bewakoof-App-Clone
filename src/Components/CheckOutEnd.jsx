import React from 'react'
import'../Styles/checkoutend.css'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Provider/UserProvider';


function CheckOutEnd() {

    const { setUserContext: signOutContext,
        isUserLoggedIn } = useUser();
    const navigate = useNavigate();

    function handleSignOut() {
        sessionStorage.removeItem('userInfo');
        sessionStorage.removeItem('authToken');
        signOutContext();
        navigate('/')
    }
  return (
    <div>  
            <dialog open className='ce-dialog'>
            <p className='ce-dialog-p'>Thanks for shopping with Bewakoof!</p>
            <form method="ce-dialog" >
            <button onClick={() => navigate('/')} className='ce-dialog-btn btn3'>Continue Shopping</button>
            <button onClick={handleSignOut} className='ce-dialog-btn btn4'>Logout</button>
           </form>
            </dialog>
    </div>
  )
}

export default CheckOutEnd