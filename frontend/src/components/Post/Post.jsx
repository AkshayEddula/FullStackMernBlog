import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './Post.css'
import Loading from '../LodingPage/LodingPage';

const Post = () => {

  const { id } = useParams();

  const [post, setPost] = useState(null)

  // fetching the each individual post based on the id
  useEffect(() => {
    axios.get(`http://localhost:5000/posts/${id}`)
      .then(response => {
        setPost(response.data)
      })
      .catch(err => {
        console.log(err);
      });
  }, [id])

  const PostDate = ({ date }) => {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  
    return <p className='date'>{formattedDate}</p>;
  };

  if(!post){
    return <Loading />
  }


  return (
    <div className='individulaPost'>
      {post ? (
        <div className='postDetails'>
          <img src={post.coverImg} alt="" />
          <div className='postDate'>
            <PostDate date={post.createdAt} />
            <p>Akshay Eddula</p>
          </div>
          <div>
            <h1>{post.title}</h1>
          </div>
          <p className='postbody'>{post.body}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default Post