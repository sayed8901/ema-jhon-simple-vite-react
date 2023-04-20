import React, { useContext } from 'react';
import './Header.css'

import logo from '../../images/Logo.svg'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contextProviders/AuthProvider';

const Header = () => {
    const {user, logOut} = useContext(AuthContext);
    // console.log(user);

    const handleLogout = () => {
        logOut()
        .then(alert('User signed out successfully'))
        .catch(error => {
            console.error(error.message);
        })
    }

    return (
        <nav className='header'>
            <img src={logo} alt="" />

            <div>
                <Link to="/">Shop</Link>
                <Link to="/order">Order</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/login">Log in</Link>
                <Link to="/signup">Sign up</Link>
                {user && 
                    <span>
                        <span className='user-info-text'>
                            Welcome,
                            <span className='user-name-text'>
                                {user.email}
                            </span>
                        </span>
                        <button onClick={handleLogout}>Sign out</button>
                    </span>}
            </div>
        </nav>
    );
};

export default Header;