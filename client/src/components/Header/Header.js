import React from 'react';
import './header.css';

const Header = () =>{
    return(
        <nav>
            <div className=''>
                <NavLink to='/'><Home/></NavLink>
                <button className='button-header'>Login/Logout</button>
            </div>
        </nav>
    )};   

export default Header;