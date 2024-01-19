import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Provider/UserProvider';

import '../Styles/SignUp.css'
import MidNav from './MidNav'
import '../Styles/MidNav.css'

function SignUp() {

    const { setUserContext: signUpContext } = useUser()
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: ''
    });



    function handleChange(event) {
        const { name, value } = event.target;

        setUserInfo({ ...userInfo, [name]: value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        signUp(userInfo)
    }

    async function signUp(userInfo) {

        try {
            const response = await fetch("https://academics.newtonschool.co/api/v1/user/signup",
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                 projectId: 'lb0plw3jgqpa',
                },
        
               body: JSON.stringify({
               name: userInfo.name,
               email: userInfo.email,
               password: userInfo.password,
               appType: 'ecommerce',
               }),
           }
        );
        
        if (response.ok) {
        const data = await response.json();
        const { token, data: { name } } = data;
        //console.log({ response, data, name });
        sessionStorage.setItem('authToken', token);
        sessionStorage.setItem('userInfo', JSON.stringify({ name }));
        // Assuming signUpContext and navigate functions are defined elsewhere
        signUpContext(token);
        navigate('/'); // Replace with your actual navigation logic
        } else {
        // Handle unsuccessful response (e.g., show an error message)
        console.error("SignUp Failed", response.status, response.statusText);
        }
        } catch (err) {
        // Handle errors that occurred during the fetch or JSON parsing
        console.error(err.message);
        }
        }
       //console.log(userInfo)
    return (
        <section >
            <MidNav />
            <form onSubmit={handleSubmit} className='signup-container'>
            <div className='div2'>Sign Up</div>
            <div>
            <input
                    type='text'
                    name='name'
                    id='name'
                    value={userInfo.name}
                    onChange={handleChange}
                    className='inpt' 
                    placeholder='Name'
                />
            </div>
                
            <div>
            <input
                    type='text'
                    name='email'
                    id='email'
                    value={userInfo.email}
                    onChange={handleChange}
                    className='inpt' 
                    placeholder='Email'
                />
            </div>
                
                <div>
                <input
                    type='password'
                    name='password'
                    id='password'
                    value={userInfo.password}
                    onChange={handleChange}
                    className='inpt' 
                    placeholder='Password'
                />
                </div>
                <div>
                <input type='submit' value='SIGN UP' className='signup-btn'/>
                </div>
            </form>
        </section>
    )
}

export default SignUp