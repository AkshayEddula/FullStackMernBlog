import { useNavigate, useParams } from 'react-router-dom';
import instance from '../../request/instance';
import Loading from '../LodingPage/LodingPage';

import React, { useEffect, useState } from 'react'

const Editpost = () => {

    const [editPost, setEditPost] = useState(null)
    const [post, setPost] = useState({ title: '', body: '', coverImg: '', tags: [] });
    const postId = useParams();
    const navigate = useNavigate()


    
    //  form handling and updating the individual posts
    const handleSubmit = (e) => {
        e.preventDefault();

        if( post.title === editPost.title && post.body === editPost.body) {
          console.log('No changes detected. Post not updated.');
          return;
        }
        if(!post.coverImg){
          post.coverImg = editPost.coverImg;
        }

        instance.put(`https://devspot-zqnb.onrender.com/posts/editpost/${postId.id}`, post)
        .then((res) => {
          console.log('Post updated successfully');
          navigate(`/posts/${postId.id}`)
        })
        .catch((err) => {
          console.log(err);
        })
    };

    // geting the post data from the server based on the post id
   useEffect(() => {
        instance.get(`https://devspot-zqnb.onrender.com/posts/editpost/${postId.id}`)
        .then(res => {
            setEditPost(res.data)
            setPost( {title: res.data.title, body: res.data.body, coverImg: res.data.coverImg, tags: res.data.tags})
        }
        ).catch(err => console.log(err));
   },[postId])

    if (!editPost) {
      return <Loading />; // Add loading indicator or handle gracefully
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = function () {
      setPost({ ...post, coverImg: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleTagClick = (tag) => {
    const updatedTags = post.tags.includes(tag)
      ? post.tags.filter(t => t !== tag)
      : [...post.tags, tag];

    setPost({ ...post, tags: updatedTags });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  if(!editPost) {
    return <Loading />; // Add loading indicator or handle gracefully
  }


  const tags = ['Frontend', 'Backend', 'FullStack', 'Machine Learning', 'Crypto', 'DevOps'];


  return (
    <div className='posts_form'>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} className='title_input'type="text" name="title" placeholder='Enter Your Title' value={post.title}  />

        <textarea onChange={handleChange} className='text_input' rows={10}name="body" placeholder='Tell Your Story' value={post.body}/>

        <label className='posts_label' htmlFor="coverImg">CoverImage: </label>
        <input onChange={handleFileUpload}  type="file" name='coverImg' />

        <div className="tags">
          <h1>Categories</h1>
          <div className='selection'>
          {tags.map(tag => (
              <button
                type="button"
                key={tag}
                onClick={() => handleTagClick(tag)}
                style={{ backgroundColor: post.tags.includes(tag) ? 'green' : '#212529' }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <input type="submit" value="Submit Post" className="submitBtn" />
      </form>
    </div>
  )
}

export default Editpost