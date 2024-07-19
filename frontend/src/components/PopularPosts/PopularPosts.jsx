import React, { useEffect, useState } from 'react';
import './PopularPosts.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../LodingPage/LodingPage';

// function to truncate title
const truncateTitle = (title, length = 50) => {
  return title.length > length ? title.substring(0, length) + '...' : title;
};

const PopularPosts = () => {
  const [posts, setPosts] = useState();

  // fetching popular posts
  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!posts) {
    return <Loading />;
  }

  return (
    <div className='Popular'>
      <h1><i>Popular Articles</i></h1>
      <div className='popularPosts'>
        {posts.slice(0, 6).map((post) => (
          <Link key={post._id} to={`/posts/${post._id}`}>
            <div className='post'>
              <img src={post.coverImg} alt={post.title} />
              <h2>{truncateTitle(post.title)}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularPosts;
