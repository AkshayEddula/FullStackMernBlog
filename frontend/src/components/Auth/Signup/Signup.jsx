import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css'

const Signup = () => {

    const [userData, setUserData] = useState({ username: '', email: '', password: '' })
    const [error, setError] = useState();
    const navigate = useNavigate()

    // Function to handle form submission and make API call to sign up user
    const handleUserSubmit = (e) => {
        e.preventDefault();

        // Vadlidation of From
        if (!userData.username ||!userData.email ||!userData.password) {
            setError('Please fill all fields');
            return;
        }

        if( userData.password.length < 6){
            setError('Password must be at least 6 characters');
            return;
        }

        axios.post('https://devspot-zqnb.onrender.com/signup', userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                navigate('/login')
                setUserData({ username: '', email: '', password: '' })
            })
            .catch(err => {
                setError(err.response.data.error)
                console.log(error);
            });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    return (
        <section className='signupPage'>
            <div className='signUpform'>
                {error && <h2>{error}</h2>}
                <form onSubmit={handleUserSubmit} action="post">
                    <label for="username">Username:</label>
                    <input onChange={handleChange} type="text" id="username" name="username" value={userData.username} />

                    <label htmlFor="email">Email: </label>
                    <input onChange={handleChange} type="email" id="email" name="email" value={userData.email} />

                    <label htmlFor="password">Password: </label>
                    <input onChange={handleChange} type="password" id="password" name="password" value={userData.password}/>

                    <input className='signupBtn' type="submit" value="Sign Up" />
                </form>

                <div>
                    Have an Account. <a href='/login'>Sign In</a>
                </div>
            </div>
        </section>
    )
}

export default Signup