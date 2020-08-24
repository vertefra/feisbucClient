// src/view/user/Index.jsx

// Look up for users

import Layout from '../components/Layout.jsx'
import Navbar from '../components/Navbar.jsx'
import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../../services/store.js'
import ErrorPage from '../static/Error.jsx'
import { requestMatchingUsers, requestUserInfo } from '../../services/requests.js'
import FriendCard from '../components/FriendCard.jsx'

const Index = (props) => {

    const [ state, dispatch] = useContext(Context)
    const [ searchFriend, setSearchFriend ] = useState('')
    const [ searchResult, setSearchResult ] = useState([])
    // const [ redirect, setRedirect ] = useState(undefined)
    // const [ error, setError ] = useState(undefined)

    // Handlers

    const handleFindFriend = (e) => {
        setSearchFriend(e.target.value)
        requestMatchingUsers(searchFriend, (err, data)=>{
            if(data){
                data.id = data._id
                setSearchResult(data)
            } else {
                console.log(err)
            }
        })        
    }

    useEffect(()=>{
        if(state.isLogged){     // set this at the beginning of every page 
            requestUserInfo(state.id, (err, data)=>{
                if(data){
                    dispatch({type:'LOAD_USER', payload: data})
                    dispatch({type:'IS_LOGGED', payload: true})
                } else {
                    console.log(err) // TODO SET REDIRECT PAGE
                }
            })
        }
        
    },[])

    useEffect(()=> {
       if(searchFriend===''){
           setSearchResult([])
       }
    }, [searchFriend, setSearchFriend])

    useEffect(()=> {})
    
    return(
        <Layout>
        <Navbar></Navbar>
        {state.isLogged ?
        <div className="profile-container">
            <div className="form-field dark-border search">
                <label>Look for friends by name</label>
                <input type="text" onChange={handleFindFriend} value={searchFriend}/>
            </div>
            <ul>
            {
                searchResult.length>0 ?
                    searchResult.map(res=>{
                        return(
                            <li key={res._id}>
                                <FriendCard friend={res}/>
                            </li>
                        )
                    }) : <h3 className="flash">nothing found</h3>           
            }
            </ul>
        </div> : <ErrorPage error="not logged"/>   
    }
        </Layout>
    )
}

export default Index