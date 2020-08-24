import React, { useContext, useEffect, useState }from 'react'
import { Context } from '../../services/store.js'
import { followUser, requestUserInfo, unfollowUser } from '../../services/requests.js'

const FollowBtn = (props) => {

    const [ state, dispatch ] = useContext(Context)
    const [ btnValue, setBtnValue ] = useState('')
    
    const ownerFriends = state.friends
    const visitedUserId = props.visitedUserId

    const follow = ownerFriends.find(id=> id===visitedUserId)

    const handleFollow = (e) => {
        console.log(e.target.innerText)
        if(e.target.innerText==='follow'){
            followUser(state.id, props.visitedUserId, (err, data)=>{
                if(data){
                    // data returned is the id of the logged user
                    // need to redirect the page to the index friends
                    // where it shows all your friend?
                    console.log(data)
                    // update the user state with the new info
                    requestUserInfo(state.id, (err, data)=>{
                        if(data){
                            dispatch({type: 'LOAD_USER', payload:data})
                            dispatch({type: 'IS_LOGGED', payload: true})
                        } else {
                            console.log(err)
                        }
                    })
                } else {
                    console.log(err)
                }
            })
        } else {
            // otherwise unfollow user
            unfollowUser(state.id, props.visitedUserId, (err, data)=>{
                if(data){
                    requestUserInfo(state.id, (err, data)=>{
                        if(data){
                            dispatch({type: 'LOAD_USER', payload:data})
                            dispatch({type: 'IS_LOGGED', payload: true})
                        } else {
                            console.log(err)
                        }
                    })
                } else {
                    console.log(err)
                }
            })
        }
    }

    useEffect(()=>{})

    return(
    <button 
        onClick={handleFollow}
        className="button-secondary"
        >
        <img
            className='dark-icon'
            src='/icons/add.svg'
        />
            {follow && 'unfollow' || 'follow'}</button>
    )
}

export default FollowBtn