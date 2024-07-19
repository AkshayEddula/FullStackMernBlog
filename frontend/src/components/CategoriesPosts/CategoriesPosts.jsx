import React, { useEffect, useState } from 'react';
import './CategoriesPosts.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../LodingPage/LodingPage';

// function to truncate title
const truncateTitle = (title, length = 50) => {
  return title.length > length ? title.substring(0, length) + '...' : title;
};

const CategoriesPosts = () => {
  const tag = useParams();
  const [posts, setPosts] = useState();
  
  useEffect(() => {
    axios.post(`http://localhost:5000/categories/${tag.tags}`)
      .then((res) => {
        setPosts(res.data);
      });
  }, [tag]);

  if (!posts) {
    return <Loading />; // Loading state while waiting for data to load
  }

  return (
    <div className='categoriePage'>
      <h1><i>{tag.tags}</i></h1>
      {posts.length === 0 ? (
        <h1>No Posts on this Category</h1>
      ) : (
        <div className='categoriePosts'>
          {posts.map((post) => (
            <Link key={post._id} to={`/posts/${post._id}`}>
              <div className='categoriePost'>
                <img src={post.coverImg} alt="" />
                <h1>{truncateTitle(post.title)}</h1>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPosts;
