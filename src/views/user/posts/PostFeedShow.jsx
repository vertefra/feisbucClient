import React, { useContext, useState, useEffect, dispatch} from 'react'
import { datetimeOptions } from '../../../services/utils'
import { Link } from 'react-router-dom'
import { toggleLike, requestUserInfo } from '../../../services/requests'
import { Context } from '../../../services/store'

const PostFeedShow = (props) => {

    const [ state ] = useContext(Context)
    const { post } = props
    const {
        content,
        createdAt,
        profile_img,
        owner_id,
        likes,
        owner,
        // tags,
        _id,
        // whoLikes
    } = post

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

    const d = new Date(createdAt)
    const formattedTimeStamp = d.toLocaleDateString('en-EN', datetimeOptions)

    const [ _likes, setLikes ] = useState(likes)

    const handleLikeButton = (e) => {
        const postId = e.target.id
        const ownerId = e.target.data-owner_id
        toggleLike(state.id, owner_id, postId, (err, data)=>{
            if(data){
                setLikes(data.likes)
            } else {
                console.log(err)
            }
        })
    } 
    
    return(
        <div className="post light-back appear">
            <Link to={`/user/${owner_id}`}>
                <header>
                        <img
                        className="profile-pic dark-border"
                        id = "feed-profile-pic"
                        src={profile_img}
                        width='80px'
                        />
                    <h5>{owner}</h5>
                </header>
            </Link>
            <div className="content">
                <p className="post-text-area">
                    "{content}"
                </p>
            </div>
            <footer>
                <button
                    id={_id}
                    data-owner_id={owner_id} 
                    className="like-button dark-back light-shadow"
                    onClick={handleLikeButton} 
                    >
                    <img src="/icons/like.svg" alt="like"/>
                    {_likes}
                </button>
                <div className="date">
                    {formattedTimeStamp}
                </div>
            </footer>
        </div>
    )
}

export default PostFeedShow