import { useNavigate, useParams } from 'react-router-dom';
import './UserEdit.css';
import React, { useEffect, useState } from 'react';
import instance from '../../../request/instance';
import Loading from '../../LodingPage/LodingPage';

const UserEdit = () => {
  const { id } = useParams(); // Destructure to directly get the user ID
  const [profile, setProfile] = useState(null);
  const [userData, setUserData] = useState({ username: '', email: '', bio: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  
  // form validation and handling and updating the user data
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.username === profile.username && userData.email === profile.email && userData.bio === profile.bio) {
      alert("No changes detected");
      return;
    }

    try {
      const res = await instance.put(`http://localhost:5000/profile/editprofile/${id}`, userData);
      console.log("Profile updated successfully", res.data);
      navigate(`/profile/${id}`);
      setProfile(res.data); // Update the profile with the new data
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error);
      } else {
        console.log(err);
      }
    }
  };

  // Fetch the user data and populate the form fields when the component mounts or the user ID changes
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await instance.get(`http://localhost:5000/profile/editprofile/${id}`);
        setProfile(res.data);
        setUserData({ username: res.data.username, email: res.data.email, bio: res.data.bio });
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  if (!profile) {
    return <Loading />;
  }

  return (
    <div className='userEdit'>
      <div className='userDetails'>
        <form onSubmit={handleSubmit}>
          <h2>Username: </h2>
          <input onChange={handleChange} value={userData.username} name='username' type="text" />
          <h2>Email Id: </h2>
          <input onChange={handleChange} value={userData.email} name='email' type="email" />
          <h2>Bio: </h2>
          <textarea onChange={handleChange} value={userData.bio} name="bio" />

          <button type='submit'>Update Profile</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default UserEdit;
