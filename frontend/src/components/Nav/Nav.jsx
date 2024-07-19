import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Nav.css';
import { AuthContext } from '../../Authcontext';
import { FaUser } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";

export const Nav = () => {
    const { isAuthenticated, logout, user } = useContext(AuthContext);
    const [categorieOpen, setCategorieOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const tags = ['Frontend', 'Backend', 'FullStack', 'Machine Learning', 'Crypto', 'DevOps'];

    const profileHandle = () => {
        setProfileOpen(!profileOpen);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleProfileClick = () => {
        setMenuOpen(false);
        setProfileOpen(false);
        setCategorieOpen(false);
    };

    return (
        <nav className='nav'>
            <div className="nav_logo">
                <Link to='/'><h1>DEVSPOT.</h1></Link>
            </div>
            <div className="navBar">
                <div className={`nav_links ${menuOpen ? 'open' : ''}`}>
                    <div className='navBarLinks'>
                        <NavLink onClick={handleProfileClick} to="/">Home</NavLink>
                        <NavLink  onClick={handleProfileClick} to="/posts">Articles</NavLink>
                        <div className='categorieMain'>
                            <NavLink onClick={() => {setCategorieOpen(!categorieOpen)}}>Categories</NavLink>
                            {categorieOpen && (
                                <div onMouseLeave={() => setCategorieOpen(false)} className='categoire' >
                                    {tags.map((tag) => (
                                        <NavLink key={tag} onClick={() => { setCategorieOpen(false);setMenuOpen(false) }} to={`categories/${tag}`}>
                                            {tag}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>
                        <NavLink onClick={handleProfileClick} to="/posts/createpost">Be a Writer</NavLink>
                    </div>
                    <div className='navToogle'>
                        {isAuthenticated ? (
                            <div onClick={profileHandle} className='authUser'>
                                <FaUser />
                                {profileOpen && <div className='authLinks'>
                                    <NavLink onClick={handleProfileClick} to={`profile/${user}`}>Profile</NavLink>
                                    <Link onClick={logout}>Logout</Link>
                                </div>}
                            </div>
                        ) : (
                            <div className='navbtns'>
                                <button type='button' className='signinbtn'>
                                    <a href="/login">Sign in</a>
                                </button>
                                <button type='button' className='getbtn'>
                                    <a href="/signup">Get Started</a>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='menu_icon' onClick={toggleMenu}>
                {menuOpen ? <RxCross1 /> : <FiMenu />}
            </div>
        </nav>
    );
};
