import React, { useContext, useEffect, useRef, useState } from 'react';
import './Posts.css';
import { AuthContext } from '../../Authcontext';
import instance from '../../request/instance';
import { useNavigate } from 'react-router-dom';
import Loading from '../LodingPage/LodingPage';

const Posts = () => {
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState({ title: '', body: '', coverImg: '', tags: [], authorId: user });
  const [selectedTags, setSelectedTags] = useState([]);
  const { isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 100); 

      return () => clearTimeout(timer); 
    }
  },[isAuthenticated, navigate])

  // handling the form submission and sending the form data to the server
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const postData = { ...post, tags: selectedTags };
  
    // Validating the post data
    if (!post.title || !post.body || !post.coverImg || selectedTags.length === 0) {
      alert("Please fill in all required fields and select at least one tag.");
      return;
    }
  
    postData.authorId = user;

    instance.post('http://localhost:5000/posts/createpost', postData, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        setPost({ title: '', body: '', coverImg: '', tags: [] });
        navigate(`/posts/${res.data._id}`)
        setSelectedTags([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = null;  
        }
      })
      .catch(err => {
        console.error("Error submitting post:", err.response.data);
      });
  };

  // form input validation
  const handleTagClick = (tag) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(updatedTags);
    console.log("Selected tags:", updatedTags);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = function () {
      setPost({ ...post, coverImg: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const tags = ['Frontend', 'Backend', 'FullStack', 'Machine Learning', 'Crypto', 'DevOps'];

  if(!post) {
    return <Loading />
  }

  return (
    <div className='posts_form'>
      <form onSubmit={handleSubmit}>
        <input className='title_input' onChange={handleChange} type="text" name="title" placeholder='Enter Your Title' value={post.title} />

        <textarea className='text_input' rows={10} onChange={handleChange} name="body" placeholder='Tell Your Story' value={post.body} />

        <label className='posts_label' htmlFor="coverImg">CoverImage: </label>
        <input type="file" onChange={handleFileUpload} name='coverImg' ref={fileInputRef} />

        <div className="tags">
          <h1>Categories</h1>
          <div className='selection'>
            {tags.map(tag => (
              <button
                type="button"
                key={tag}
                onClick={() => handleTagClick(tag)}
                style={{ backgroundColor: selectedTags.includes(tag) ? 'green' : '#212529' }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <input type="submit" value="Submit Post" className="submitBtn" />
      </form>
    </div>
  );
};

export default Posts;
