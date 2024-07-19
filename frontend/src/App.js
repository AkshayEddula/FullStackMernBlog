import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Nav } from './components/Nav/Nav';
import Main from './components/main/Main';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Posts from './components/posts/Posts';
import Post from './components/Post/Post';
import Signup from './components/Auth/Signup/Signup';  
import Login from './components/Auth/Login/Login';
import Allposts from './components/AllPosts/Allposts';
import AuthProvider from './Authcontext';
import Profile from './components/Auth/Profile/Profile';
import UserEdit from './components/Auth/UserEdit/UserEdit';
import Editpost from './components/Editpost/Editpost';
import CategoriesPosts from './components/CategoriesPosts/CategoriesPosts';
import Footer from './components/Fotter/Footer';
import ForgotPassword from './components/Auth/ForgotPassword/ForgotPassword';


function App() {

  const [posts,setPosts] = useState(null)

  // fetching the posts from server
  useEffect(() => {
    axios.get('https://devspot-zqnb.onrender.com/')
    .then(response => {
      setPosts(response.data)
    })
    .catch(err => {
      console.log(err);
    });
  },[])

 
  return (
  <BrowserRouter>
    <AuthProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<Main posts={posts} />} />
        <Route path="/posts" element={<Allposts />} />
        <Route path='/posts/createpost' element={<Posts />} />
        <Route path='/posts/:id' element={<Post />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login'  element={<Login />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/profile/editprofile/:id' element={<UserEdit  />} />
        <Route path='/posts/editpost/:id' element={<Editpost  />} />
        <Route path='/categories/:tags' element={<CategoriesPosts  />} />
        <Route path='/forgotpassword' element={<ForgotPassword  />} />
      </Routes>
      <Footer />
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
