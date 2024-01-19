import React from 'react'

function Login() {
  return (
    <h2>404 Page not found.</h2>
  )
}

export default Login
// import React  from 'react'
// import { Link } from 'react-router-dom'
// import MidNav from './MidNav'
// import '../Styles/MidNav.css'

// function Login() {

  
//   return (
//     <div>
//         <MidNav/>
//         <div className='signup-container'>
//         <div className='div1'>Login to your account</div>
//         <div><input type="text" className='inpt' placeholder='Email'/></div>
//         <div><input type="password" className='inpt' placeholder='Password'/></div>
//         <div className='new-user'>New User? &nbsp;<Link to="/signup">Sign Up</Link></div>
//         <div><button className='signup-btn'>LOGIN</button></div>
//     </div>
//     </div> 
//   )
// }

// export default Login

{/* <div>
        <MidNav />
        <form onSubmit={handleSubmit} >
        <div className='signup-container'>
        <div className='div2'>Sign Up</div>

        <div><input 
               type='text'
               name='name'
               id='name'
               value={userInfo.name}
               onChange={handleChange}
               className='inpt' 
               placeholder='Name'
               />
        </div>
        <div><input 
                type='text'
                name='email'
                id='email'
                value={userInfo.email}
                onChange={handleChange} 
                className='inpt' 
                placeholder='Email'
                />
        </div>
        <div><input 
                 type='password'
                 name='password'
                 id='password'
                 value={userInfo.password}
                 onChange={handleChange} 
                 className='inpt' 
                 placeholder='Password'
                 />
        </div>
        <div><button className='signup-btn'>SIGN UP</button></div>
        </div>
        </form>
    </div> */}


    // function SignUp() {

    //   const { setUserContext: signUpContext } = useUser()
    //     const navigate = useNavigate();
    
    //     const [userInfo, setUserInfo] = useState({
    //         name: '',
    //         email: '',
    //         password: ''
    //     });
    
    
    
    //     function handleChange(event) {
    //         const { name, value } = event.target;
    
    //         setUserInfo({ ...userInfo, [name]: value });
    //     }
    
    //     function handleSubmit(event) {
    //         event.preventDefault();
    //         signUp(userInfo)
    //     }
    
    //     async function signUp() {
    //         try {
    //             //post request for signup
    
    //             const response = await fetch(
    //                 "https://academics.newtonschool.co/api/v1/user/signup", {
    //                 method: 'POST',
    //                 headers: {
    //                     projectID: 'lb0plw3jgqpa',
    //                 },
    //                 body: JSON.stringify({
    //                     ...userInfo,
    //                     appType: 'ecommerce'
    //                 })
    //             }
    //             );
    
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 console.log({ response});
    
    //                 const { token, data: { name } } = data;
    
    //                 console.log({ name });
    
    //                 sessionStorage.setItem('authToken', token);
    //                 sessionStorage.setItem('userInfo', JSON.stringify(name));
    //                 //pass the user data to the context
    //                 signUpContext(token);
    //                 //navigate the user to home page
    //                 navigate('/');
    
    //             } else {
    //                 console.error("SignUp Failed", err)
    //             }
    
    //         } catch (err) {
    //             if (err) {
    //                 console.error(err.response.data.message);
    //             }
    //         }
    //     }
    //     console.log(userInfo)    