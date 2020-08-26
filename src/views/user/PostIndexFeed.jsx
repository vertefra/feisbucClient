import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Layout from '../components/Layout'
import { Context } from '../../services/store'
import { requestUserInfo, getFeed } from '../../services/requests'
import ErrorPage from '../static/Error'
import PostFeedShow from './posts/PostFeedShow.jsx'

const PostIndexFeed = (props) => {

    const [state, dispatch ] = useContext(Context)
    const [feed, setFeed ] = useState([])

    // THIS IS TO MAINTAIN THE SESSION ALSO AFTER A REFRESH

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
        if(state.isLogged){
            getFeed(state.id, (err, data)=>{
            if(data){
                setFeed(data)
            } else {
                console.log(err)
            }
        })
    }
        
    },[state.isLogged])

    useEffect(()=>{
    },[feed])

    return(
        <Layout>
            <Navbar></Navbar>
        {
            state.isLogged ? 
            <div className="profile-container appear">
                <h1>here my feed</h1>
                {
                    feed.map((thisPost, id)=>{
                        return <PostFeedShow key={id} post={thisPost} />
                    })
                }


            </div> : <ErrorPage error="not logged"/>
        }




        </Layout>
    )
}

export default PostIndexFeed
