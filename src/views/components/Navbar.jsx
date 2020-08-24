import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../services/store';

const Navbar = (props) => {

const [ state, dispatch] = useContext(Context)
const [ redirect, setRedirect ] = useState(undefined)
const [ error, setError ] = useState(undefined)

const handleLogOut = () => {
    setRedirect('/')
    dispatch({ type: 'CLEAN_STATE', payload: true})
}


return (
    <nav className="navbar">
        <ul>
            <li className='icon'>
                <Link to={`/user/${state.id}`}>
                    <img
                        src='/icons/my-profile.svg'
                        alt="my profile"
                    ></img>
                </Link>
            </li>
            <li className='icon'>
                <Link to={`/user/${state.id}`}>
                    <img
                        src='/icons/home.svg'
                        alt='home'
                    />    
                </Link>
            </li>
            <li className='icon'>
                <Link to={`/user/${state.id}/friends`}>
                    <img
                        src='/icons/friends.svg'
                        alt="my friends"
                    />    
                </Link>
            </li>
            <li className='icon'>
                <Link to={`/user`}>
                    <img
                        src='/icons/search-friend.svg'
                        alt='add friend'
                    />
                </Link>
            </li>
            <li id="username">
                <h5>Logged as {state.username}</h5>
            </li>
            <li id="logout-btn">
                <button onClick={handleLogOut}>log out</button>
            </li>

        </ul>
    </nav>
    );
}

export default Navbar
