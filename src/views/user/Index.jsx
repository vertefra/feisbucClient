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

    // THIS WILL MAINTAINE THE SESSION ALSO AFTER A REFRESH

    useEffect(()=>{
        if(state.isLogged===false){
            const userId = sessionStorage['user']
            if(userId){
                requestUserInfo(userId, (err, data)=>{
                    if(data){
                        dispatch({type:'LOAD_USER',payload:data})
                        dispatch({type:'IS_LOGGED', payload:true})
                    } else {
                        console.log('error, cannot retrieve user info for id: ', userId)
                    }
                })
            } else {
                console.log('You are not logged in and you dont have a valid session')
            }
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
        <div className="profile-container appear">
            <div className="form-field dark-border search">
                <label>Look for friends by name</label>
                <input type="text" onChange={handleFindFriend} value={searchFriend}/>
            </div>
            <div className="friend-showcase">
            {
                searchResult.length>0 ?
                    searchResult.map(res=>{
                        return(
                            <div key={res._id}>
                                <FriendCard friend={res}/>
                            </div>
                        )
                    }) : <h3 className="flash">nothing found</h3>           
            }
            </div>
        </div> : <ErrorPage error="not logged"/>   
    }
        </Layout>
    )
}

export default Index