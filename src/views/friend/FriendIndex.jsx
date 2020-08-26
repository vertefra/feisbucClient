// src/views/friend

import React, { useContext, useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import { Context } from '../../services/store'
import FriendCard from '../components/FriendCard'
import { requestUserInfo, cleanDeletedFriend } from '../../services/requests.js'

// friend Index

const FriendIndex = (props) => {

    const [ state, dispatch ] = useContext(Context)
    const [ friends, setFriends ] = useState([])
    const nOfFriends = state.friends.length

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

    useEffect(()=>{
        state.friends.forEach((friendId=>{
            requestUserInfo(friendId, (err, friend)=>{
                if(friend){
                    setFriends((old)=>[...old, friend])
                } else {
                    console.log('cannot get id ', friendId)
                    // should make a better error response to verify that the problem
                    // is really a deleter friend
                    cleanDeletedFriend(state.id, friendId, (err, data)=>{
                        console.log(data)
                    })
                }
            })
        }))
    },[state.friends])

   
    return(
        <Layout>
            <Navbar></Navbar>
            <div className="profile-container">
                <h2 className="flash">you have {nOfFriends} friends</h2>
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