// src/view/user/Show.jsx

import React, { useContext, useEffect, useState } from 'react'
import { requestUserInfo } from '../../services/requests.js'
import { Context } from '../../services/store.js'
import { Redirect } from 'react-router-dom'

import PostIndex from './components/PostIndex.jsx'
import FolloBtn from '../components/FollowBtn.jsx'
import PostInput from './components/PostInput.jsx'
import Layout from '../components/Layout.jsx'
import Navbar from '../components/Navbar.jsx'
import ErrorPage from '../static/Error.jsx'

const Show = (props) => {

    const [ redirect, setRedirect ] = useState(undefined)
    const [ error, setError ] = useState(undefined)
    const [ visitedUser, setVisitedUser ] = useState({})
    const [ state, dispatch ] = useContext(Context)

    const visitedProfileId = props.match.params.id

    const handleEdit = () => {
        setRedirect(`/user/${state.id}/edit`)
    }
    
    // setting the state to isLogged: true in order to visualize pages

    if(state.isAuth){
        requestUserInfo(state.id, (err, data)=>{
            if(err){
                console.log(err)
                setError('Authentication failed')
            } else {
                dispatch({ type: 'LOAD_USER', payload:data})
                dispatch({ type: 'IS_LOGGED', payload:true})
            }
        })
    }

    useEffect(()=>{
        if(state.isLogged){

            // is the state isLogged gather the info about the user/id
            // and create an object to print the info in the page.
            // this will keep separate the user from other people that you
            // want to see the profile of. If the id are equal add a button
            // to edit the profile

            requestUserInfo(visitedProfileId, (err, user)=>{
                if(user){
                    setVisitedUser(user)
                } else {
                    console.log(err)
                }
            })
        }
        
    },[state.isLogged, visitedProfileId])

    useEffect(()=>{
        if(error){
            setRedirect('/error')
        }
        if(!error && redirect){
        } 
    }, [error, redirect])

    const { id, last_name, first_name, city, profile_img } = visitedUser

    // check if the user is the profile owner //

    const isOwner = state.id===id && state.isLogged ? true : false

    // check if is friend to determin if the button should be follow or unfollow //
    
    return(
        <Layout>
            {state.isLogged ? 
            <div className="profile-container">
                { redirect && <Redirect from='/user/:id' to={`${redirect}`}/> }
                <Navbar></Navbar>
                <div className="profile-container">
                    <header>
                            <h1 className="main-name">{first_name} {last_name}</h1>

                    {/* 
                        Check if the id in state is equal to the id of the visiting profile 
                        and the profile is logged print a edit button otherwise check if 
                        the profile is in my friends. if not print a button to follow
                        follow button will look in the friends if the id is present 
                
                    */}
                            <figure>
                                <img
                                    className="profile-pic dark-border" 
                                    width={'100px'}
                                    src={profile_img} 
                                    alt="profile pic"
                                />
                            </figure>
                    </header>
                    <div className="profile-ctr-btn">
                    {
                    isOwner 
                        ? <>
                            
                            <button 
                                onClick={handleEdit}
                                className='button-secondary'
                            >
                                <img
                                className='dark-icon'
                                src='/icons/edit.svg'
                                />
                            Edit profile</button>
                            </>
                         
                        : <FolloBtn visitedUserId={visitedUser.id}/>
                    }
                    </div>
                    <section className="info-section">
                        <h5>From: {city ? city : 'city not specified'}</h5>
                        <h5>Food that I love: </h5>
                    </section>
                    <section>
                        <h5>New Post</h5>
                        { isOwner ? <PostInput/> : null}
                    </section>
                    <section>
                        <h5>{isOwner ? 'My posts' : 'Posts'}</h5>
                        <PostIndex 
                            state={state} 
                            isOwner={isOwner} 
                            visitedUser={visitedUser}
                        />
                    </section>
                </div>
            </div>
            : <ErrorPage error="not logged"/>}
        </Layout>
    )
}

export default Show