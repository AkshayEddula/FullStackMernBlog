import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Allpost.css'
import Loading from '../LodingPage/LodingPage'

const Allposts = () => {

  const [allPosts, setAllPosts] = useState(null)

  // fetching all posts from database
  useEffect(() => {
    axios.get('https://devspot-zqnb.onrender.com/posts')
      .then((response) => {
        setAllPosts(response.data)
      }).catch((error) => { console.log(error) })
  }, [])

  if(!allPosts){
    return <Loading />
  }

  return (
    <div className='AllPosts'>
      <h1><i>All Articles</i></h1>
      <div className='AllPostsCon'>
        {allPosts && allPosts.map((post) =>
          <div key={post._id} className='singlePost'>
            <img src={post.coverImg} alt="" />
            <h2><a href={`/posts/${post._id}`}>{post.title}</a></h2>
          </div>)}
      </div>
    </div>
  )
}

export default Allposts