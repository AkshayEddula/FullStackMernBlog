import './Categories.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../LodingPage/LodingPage';

// function to truncate title
const truncateTitle = (title, length = 50) => {
  return title.length > length ? title.substring(0, length) + '...' : title;
};

const Categories = () => {
  const [posts, setPosts] = useState([]);

  // Fetching data from backend
  useEffect(() => {
    axios.get('http://localhost:5000')
      .then(response => {
        setPosts(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  const tags = ['Frontend', 'Backend', 'FullStack', 'Machine Learning', 'Crypto', 'DevOps'];

  // Function to filter posts by tag
  const getPostsByTag = (tag) => {
    return posts.filter(post => post.tags.includes(tag));
  };

  if (!posts) {
    return <Loading />;
  }

  return (
    <div className='categories'>
      {tags.map((tag) => {
        const postsByTag = getPostsByTag(tag);
        if (postsByTag.length === 0) return null;
        return (
          <div className='categoriesCon' key={tag}>
            <h1><i>{tag}</i></h1>
            <div className='categoriesPosts'>
              {postsByTag.map((post, index) => (
                <div className='post' key={index}>
                  <Link to={`/posts/${post._id}`}>
                    <img src={post.coverImg} alt={post.title} />
                    <h2>{truncateTitle(post.title)}</h2>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
