import React, { useContext, useState, useEffect } from 'react'
import { datetimeOptions } from '../../../services/utils.js'
import { toggleLike, deletePost, updatePost } from '../../../services/requests.js'
import { Context } from '../../../services/store.js'

const PostShow = (props) => {

    const post = props.post

    const [ state, dispatch ] = useContext(Context)
    const [ likes, setLikes ] = useState(post.likes)
    const [ postContent, setPostContent ] = useState('')
    const [ editMode, setEditMode ] = useState(false)
    const [ postClassName, setPostClassName ] = useState('post-text-area')


    const d = new Date(post.createdAt)
    // date time formatting options
    
    const formattedTimestamp = d.toLocaleDateString('en-EN',datetimeOptions)
    const isOwner = props.isOwner
    const postId = props.id

    const handlePostEdit = (e) => {
        console.log(e.target.value)
        setPostContent(e.target.value)
    }

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

    const toggleEditMode = (e) => {
        const mode = editMode ? false : true
        const className = mode ? 'post-text-area post-edit' : 'post-text-area'
        setEditMode(mode)
        setPostClassName(className)
        if(!mode){
            const postId = e.target.id
            updatePost(state.id, postId, postContent, (err, data)=>{
                if(data){
                    console.log(data)
                } else {
                    console.log(err)
                }
            })
        }
    }

    useEffect(()=>{
        setPostContent(post.content)
    }, [])

    return(
        <div className='post light-back'>
            <input
                type="textarea"
                value={postContent}
                onChange={handlePostEdit}
                readOnly={!editMode}
                className={postClassName}
            />
            {
                isOwner &&
                
                    // THESE ARE ALL THE BUTTONS RENDERED ONLY IF ONWNER IS TRUE

                    <div>
                        <button 
                            id={postId}
                            className="deleteButton" 
                            onClick={handleDeleteButton}
                        >X</button>

                {

                // TOGGLE THE BUTTON FOR EDIT MODE AND SET THE INPUT FIELD TO READONLY TRUE OR FALSE
                
                editMode ? 
                        <button
                            className="editButton"
                            id={postId}
                            onClick={toggleEditMode}
                        ><img 
                            src='/icons/save.svg'
                        /> 
                        </button>  
                        :<button 
                            id={postId}
                            className="editButton" 
                            onClick={toggleEditMode}>
                            <img
                                src='/icons/edit.svg'
                            />
                        </button>
                
                // END EDIT/SAVE BUTTONS 
                
                }
                
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