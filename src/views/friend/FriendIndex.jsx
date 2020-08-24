// src/views/friend

import React, { useContext, useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import { Context } from '../../services/store'
import FriendCard from '../components/FriendCard'
import { requestUserInfo } from '../../services/requests'

// friend Index

const FriendIndex = (props) => {

    const [ state, dispatch ] = useContext(Context)
    const [ friends, setFriends ] = useState([])
    const nOfFriends = state.friends.length

    useEffect(()=>{
        if(state.isLogged){     
            requestUserInfo(state.id, (err, data)=>{
                if(data){
                    // dispatch({type:'LOAD_USER', payload: data})
                    dispatch({type:'IS_LOGGED', payload: true})
                } else {
                    console.log(err) // TODO SET REDIRECT PAGE
                }
            })
        }
        
    },[])

    useEffect(()=>{
        state.friends.forEach((friendId=>{
            requestUserInfo(friendId, (err, friend)=>{
                if(friend){
                    setFriends((old)=>[...old, friend])
                }
            })
        }))
    },[state.friends])

   
    return(
        <Layout>
            <Navbar></Navbar>
            <div className="profile-container">
                <h2 class="flash">you have {nOfFriends} friends</h2>
                <div className="friend-showcase">
                {friends.map(friend=>{
                    return <FriendCard key={friend.id}friend={friend} />
                })}
                </div>
            </div>
        </Layout>
    )
}

export default FriendIndex 