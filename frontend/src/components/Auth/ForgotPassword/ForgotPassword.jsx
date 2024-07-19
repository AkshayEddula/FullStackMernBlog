import React, { useState } from 'react'
import instance from '../../../request/instance'

const ForgotPassword = () => {

    const [data, setData] = useState({ username: '', oldpassword: '', newpassword: '' });
    const [error, setError] = useState(null);

    // form handling and sending data to server
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!data.username || !data.oldpassword || !data.newpassword){
            setError("All fields are required")
            return;
        }

        instance.put('https://devspot-zqnb.onrender.com/forgotpassword', data)
        .then((res) => {
            console.log(res.data);
            alert("Password changed successfully");
        })
        .catch((err) => {
            console.log(err);
            setError(err.response.data.error);
        })
    }

    const handlechange = (e) => {
        setError('')
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        setError(null)
    }


  return (
    <div className='loginSec'>
        <div className='loginForm'>
                {error &&  <h2>{error}</h2>}
                <form onSubmit={handleSubmit} action="post">
                    <label for="username">username:</label>
                    <input onChange={handlechange} value={data.username}  type="text" id="username" name="username" required />

                    <label for="oldpassword">OldPassword:</label>
                    <input onChange={handlechange} value={data.oldpassword} type="text" id="oldpassword" name="oldpassword" required />

                    <label htmlFor="newpassword">NewPassword: </label>
                    <input onChange={handlechange} value={data.newpassword} type="password" id="newpassword"  name="newpassword" required />

                    <input className='loginBtn' type="submit" value='Change Password' />
                </form>
            </div>
    </div>
  )
}

export default ForgotPassword