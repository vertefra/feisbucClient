import React, { useContext, useState, useEffect } from 'react'
import { datetimeOptions } from '../../../services/utils.js'
import { toggleLike, deletePost } from '../../../services/requests.js'
import { Context } from '../../../services/store.js'

const PostShow = (props) => {

    const post = props.post

    const [ state, dispatch ] = useContext(Context)
    const [ likes, setLikes ] = useState(post.likes)
    const d = new Date(post.createdAt)
    // date time formatting options
    
    const formattedTimestamp = d.toLocaleDateString('en-EN',datetimeOptions)
    const isOwner = props.isOwner
    const postId = props.id

    const handleLikeButton = (e) => {
        const postId = e.target.id
        const visitedProfileId = props.visitedUserId
        toggleLike(state.id, visitedProfileId, postId, (err, data)=>{
            if(data){
                setLikes(data.likes)
            } else {
                console.log(err)
            }
        })
    }
    
    const handleDeleteButton = (e) => {
        const postId = e.target.id
        deletePost(state.id, postId, (err, posts)=>{
            if(posts){
                props.handleRenderAfterDelete(posts)
            } else {
                console.log(err)
            }
        })
    }

    const handleEditButton = (e) => {
        console.log('edit', e.target.id)
    }

    useEffect(()=>{
        console.log('rerendering')
    })

    return(
        <div className='post light-back'>
            <p>"{post.content}"</p>
            {
                isOwner && 
                    <div>
                        <button 
                            id={postId}
                            className="deleteButton" 
                            onClick={handleDeleteButton}
                        >X</button>

                        <button 
                            id={postId}
                            className="editButton" onClick={handleEditButton}>
                            <img
                                src='/icons/edit.svg'
                            />
                        </button>
                    </div>
            }
            <footer>
                <div className="date">
                    {formattedTimestamp}
                </div>
                <div className="likes">
                    <button
                        id={postId} 
                        className="like-button dark-back" 
                        onClick={handleLikeButton}>
                        <img src="/icons/like.svg" alt="like"/>
                        {likes}
                    </button>
                </div>
            </footer>
        </div>
    )
}

export default PostShow