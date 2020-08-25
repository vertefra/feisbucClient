import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Context } from '../../services/store';
import Modal from '../static/Modal';

const Navbar = (props) => {

const [ state, dispatch] = useContext(Context)
const [ redirect, setRedirect ] = useState(undefined)
const [ error, setError ] = useState(undefined)

const handleLogOut = () => {
    setRedirect('/')
    sessionStorage['user'] = ''
    dispatch({ type: 'CLEAN_STATE', payload: true})
}


return (
    <nav className="navbar">
        { 
            redirect ? <Redirect to={redirect}/> :
            <ul>
                <Link to={`/user/${state.id}`}>
                    <li className='icon light-shadow'>
                            <img
                                src='/icons/my-profile.svg'
                                alt="my profile"
                            ></img>
                    </li>
                </Link>
                <Link to={`/user/${state.id}/posts`}>
                    <li className='icon light-shadow'>
                            <img
                                src='/icons/home.svg'
                                alt='home'
                            />    
                    </li>
                </Link>
                <Link to={`/user/${state.id}/friends`}>
                <li className='icon light-shadow'>
                    <img
                        src='/icons/friends.svg'
                        alt="my friends"
                    />    
                </li>
                </Link>
                <Link to={`/user`}>
                    <li className='icon light-shadow'>
                        <img
                            src='/icons/search-friend.svg'
                            alt='add friend'
                        />
                    </li>
                </Link>
                <li id="username">
                    <h5>Logged as {state.username}</h5>
                </li>
                <li id="logout-btn">
                    <button onClick={handleLogOut}>log out</button>
                </li>

            </ul> 
        }
    </nav>
    );
}

export default Navbar
