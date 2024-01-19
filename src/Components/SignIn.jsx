import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Provider/UserProvider';

import '../Styles/SignUp.css'
import MidNav from './MidNav'
import '../Styles/MidNav.css'

function SignIn() {

    const { setUserContext: signInContext } = useUser();
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: ''
    });



    function handleChange(event) {
        const { name, value } = event.target;

        setUserInfo({ ...userInfo, [name]: value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        signIn(userInfo);
    }

    async function signIn(userInfo) {

        try {
            const response = await fetch("https://academics.newtonschool.co/api/v1/user/login",
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                 projectId: 'lb0plw3jgqpa',
                },
        
               body: JSON.stringify({
               email: userInfo.email,
               password: userInfo.password,
               appType: 'ecommerce',
               }),
           }
        );
        if (response.ok) {
        const data = await response.json();
        const { token, data: { name } } = data;

        console.log({ response, data, name });

        sessionStorage.setItem('authToken', token);
        sessionStorage.setItem('userInfo', JSON.stringify(name));

        console.log(token);

        signInContext(token);
        navigate('/'); 
        } else {
        // Handle unsuccessful response (e.g., show an error message)
        console.error("SignUp Failed", response.status, response.statusText);
        }
        } catch (err) {
        // Handle errors that occurred during the fetch or JSON parsing
        console.error(err.message);
        }
        }
       
    return (
        <section >
            <MidNav />
            
            <form onSubmit={handleSubmit} className='signup-container'>

            <div className='div1'>Login to your account</div>
            
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
                
                <div className='new-user'>
                <p>New user?
                <button  className="signup-link" onClick={() => navigate('/signup')} >SignUp here!</button>
                </p>
                </div>
                <div><input type='submit' value='LOGIN' className='signup-btn' /></div>

                {/* <input type='submit' value='Sign In' onClick={() => navigate('/')}/>
                <p>Don't have an account?</p>
                <button onClick={() => navigate('/signup')} >SignUp here!</button> */}
            </form>
        </section>
    )
}

export default SignIn