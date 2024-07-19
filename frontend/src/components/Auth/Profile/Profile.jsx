import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Profile.css';
import instance from '../../../request/instance';
import Loading from '../../LodingPage/LodingPage';

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const { id } = useParams();

    // Fetching profile data
    useEffect(() => {
        if (!profileData) {
            instance.get(`https://devspot-zqnb.onrender.com/profile/${id}`)
                .then((res) => {
                    setProfileData(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [id, profileData]);

    // Handling the deletePost method
    const deletePost = async (postId) => {
        // Show confirmation dialog
        const userConfirmed = window.confirm('Are you sure you want to delete this post?');
        
        if (userConfirmed) {
            try {
                const response = await instance.delete(`https://devspot-zqnb.onrender.com/posts/deletepost/${postId}`);
                // Update the state to remove the deleted post from the list
                setProfileData((prevData) => ({
                    ...prevData,
                    posts: prevData.posts.filter(post => post._id !== postId)
                }));
            } catch (error) {
                console.error("Error deleting post:", error);
            }
        }
    };

    const handleDelete = (postId) => {
        deletePost(postId);
    };

    if (!profileData || !profileData.user) {
        return <Loading />; // Add loading indicator or handle gracefully
    }

    return (
        <div className='profile'>
            <div className="profilename">
                {profileData.user.profileImg ? (
                    <img width={200} height={200} src={profileData.user.profileImg} alt="Profile" />
                ) : (
                    <img width={200} height={200} src='/images/user.png' alt="Default Profile" />
                )}
                <h1>{profileData.user.username}</h1>
                <Link to={`/profile/editprofile/${profileData.user._id}`}>
                    <button>Edit Profile</button>
                </Link>
            </div>
            <div className='profileDetails'>
                <h2>Email Id: </h2>
                <h1>{profileData.user.email}</h1>
                <h2>Bio: </h2>
                {profileData.user.bio ? <h1>{profileData.user.bio}</h1> : <h1>Bio is Empty</h1>}
            </div>
            <div className='articles'>
                <h1>Your Articles</h1>
                {profileData.posts.length !== 0 ? (
                    <div>
                        {profileData.posts.map((post) => (
                            <div className='articles_details' key={post._id}>
                                <h2>{post.title}</h2>
                                <div className='article_btns'>
                                    <Link to={`/posts/editpost/${post._id}`}>
                                        <button>Edit Post</button>
                                    </Link>
                                    <button onClick={() => handleDelete(post._id)}>Delete Post</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <h1>You have No Articles</h1>
                )}
            </div>
        </div>
    );
};

export default Profile;
