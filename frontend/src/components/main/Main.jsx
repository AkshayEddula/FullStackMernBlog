import React from 'react';
import './Main.css';
import PopularPosts from '../PopularPosts/PopularPosts';
import Categories from '../Categories/Categories';
import { Link } from 'react-router-dom';
import Loading from '../LodingPage/LodingPage';

// function to format date and time
const PostDate = ({ date }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return <p className='date'>{formattedDate}</p>;
};

// function to truncate title
const truncateTitle = (title, length = 27) => {
  return title.length > length ? title.substring(0, length) + '...' : title;
};

const Main = ({ posts }) => {

  if (!posts) {
    return <Loading />;
  }

  return (
    <div className='main'>
      <div className='weekArticle'>
        <h1><i>Best of the week</i></h1>
        <div className='weekBest'>
          <div className='weekCon'>
            <div className='weekImg'>
              <img src={posts[1].coverImg} alt="Best of the week" />
            </div>
            <div className='articleDetails'>
              <div className='dateSec'>
                <PostDate date={posts[1].createdAt} />
                <p className='tag'>{posts[1].tags[0]}</p>
              </div>
              <Link to={`/posts/${posts[1]._id}`}><div className='title'>
                <h1>{truncateTitle(posts[1].title)}</h1>
              </div></Link>
            </div>
          </div>
          <div className='weekcon2'>
            <div className='weekPost'>
              <img src={posts[2].coverImg} alt="Game Development" />
              <div className='dateSec2'>
                <PostDate date={posts[2].createdAt} />
                <p className='tag'>{posts[2].tags[0]}</p>
              </div>
              <Link to={`/posts/${posts[2]._id}`}><div className="title2">
                <h1>{truncateTitle(posts[2].title)}</h1>
              </div></Link>
            </div>
            <div className='weekPost'>
              <img src={posts[0].coverImg} alt="SQL Learning" />
              <div className='dateSec2'>
                <PostDate date={posts[0].createdAt} />
                <p className='tag'>{posts[0].tags[0]}</p>
              </div>
              <Link to={`/posts/${posts[0]._id}`} ><div className="title2">
                <h1>{truncateTitle(posts[0].title)}</h1>
              </div></Link>
            </div>
          </div>
        </div>
      </div>
      <PopularPosts />
      <Categories />
    </div>
  );
};

export default Main;
