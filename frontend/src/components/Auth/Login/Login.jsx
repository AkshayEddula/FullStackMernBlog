import axios from 'axios';
import React, { useState } from 'react'
import { useContext } from 'react';
import './Login.css'
import { AuthContext } from '../../../Authcontext';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [loginData, setLogindata] = useState({ username: '', password: '' })
    const [error,setError] = useState(null)
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    // form handling and sending data to server
    const handleSubmit = (e) => {
        e.preventDefault();

        // form Validations 
        if (loginData.username === '' || loginData.password === '') {
            alert('Please fill in all fields');
            return;
        }

        axios.post('https://devspot-zqnb.onrender.com/login', loginData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                login(res.data.accessToken, res.data.id);
                setLogindata({ username: '', password: '' })
                navigate('/');
            })
            .catch(err => {
                setError(err.response.data.error)
                console.log(err.response.data.error)
            });
    }

    // Input Change Handler  for form fields  and error handling  for empty fields  and server errors  using React Hooks
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogindata({ ...loginData, [name]: value });
        setError(null)
    }


    return (
        <section className='loginSec'>
            <div className='loginForm'>
                {error && <h2>{error}</h2>}
                <form onSubmit={handleSubmit} action="post">
                    <label for="username">username:</label>
                    <input onChange={handleChange} type="text" id="username" value={loginData.username} name="username" required />

                    <label htmlFor="password">password: </label>
                    <input onChange={handleChange} type="password" id="password" value={loginData.password} name="password" required />

                    <input className='loginBtn' type="submit" value='Login' />
                </form>
                <div>
                    <a href="/forgotpassword">Forgot Password?</a>
                </div>
                <div>
                    Don't Have an Account. <a href='/signup'>Sign Up</a>
                </div>
            </div>
        </section>
    )
}

export default Login