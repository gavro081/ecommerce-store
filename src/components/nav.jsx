import React, { useState, useRef, useEffect } from "react";
import { MdLocalShipping } from "react-icons/md";
import './nav.css'
import { AiOutlineSearch } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import { auth } from "./firebaseConfig"
import { useAuth } from "./authcontext";
import { signOut } from "firebase/auth";

const Nav = ({ search, setSearch, searchproduct, loading }) => {

    const [isOpen, setIsOpen] = useState('false');
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const handleOutsideClick = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target) &&
            buttonRef.current && !buttonRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const { currentUser } = useAuth();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsOpen(false);
            // Navigate('/');
        } catch (error) {
            console.error('Error logging out: ', error);
        }
    };

    return (
        <div className="nav">
            <div className="container">
                <div className="header">
                    <div className="mid-header">
                        <Link to='/'>
                            <div className="logo">
                                <img src="logo.png"></img>
                            </div>
                        </Link>
                        <div>
                            {currentUser ? (
                                <div className="welcome">
                                    <button
                                        className="btn"
                                        onClick={toggleMenu}
                                        ref={buttonRef}
                                    >
                                       {currentUser?.displayName?.[0] || ''}
                                    </button>
                                    {isOpen && currentUser.displayName && (
                                        <div className="dropdown" ref={menuRef}>
                                            <ul>
                                                <li>
                                                    <p>Hey {currentUser.displayName}</p>
                                                </li>
                                                <li>
                                                    <button className='btn' onClick={handleLogout}>
                                                        log out
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="btns-div">
                                    <Link to='/login'>
                                        <div className="btn">
                                            <button>log in</button>
                                        </div>
                                    </Link>
                                    <Link to='/register'>
                                        <div className="btn">
                                            <button>register</button>
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="last-header">
                        <div>
                            <ul>
                                <li><Link to='/' className="link">home</Link></li>
                                <li><Link to='/shop' className="link">shop</Link></li>
                                <li><Link to='/about' className="link">about</Link></li>
                                <li><Link to='/contact' className="link">contact</Link></li>
                            </ul>
                        </div>
                        <div className="right">
                            {/* <div className="search-box">
                                <input type="text" value={search} placeholder="search" onChange={(e) => setSearch(e.target.value)}></input>
                                <button onClick={() => { searchproduct() }}><AiOutlineSearch /></button>
                            </div> */}
                            <Link to='/cart' className="cart-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>cart</title><path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" /></svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav