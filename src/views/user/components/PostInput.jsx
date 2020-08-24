import React, { useState, useEffect, useContext } from 'react'
import { addNewPost, requestUserInfo } from '../../../services/requests'
import { Context } from '../../../services/store'

const PostInput = (props) => {

    const [ state, dispatch ] = useContext(Context)
    const [ post, setPost ] = useState('')
    
    const handleSetPost = (e) =>{
        setPost(e.target.value)
    }

    const handlePostSubmit = (e) =>{
        addNewPost(state.id, post, (err, data)=>{
            if(data){
                requestUserInfo(state.id, (err, data)=>{
                    if(data){
                        // update the global state with the new info from database
                        setPost('')
                        dispatch({ type:'LOAD_USER', payload: data })
                        dispatch({ type:'IS_LOGGED', payload:true })
                    }
                })
            } else {
                console.log(err)
            }
        })
    }

    useEffect(()=>{
    },[post, state])
    
    return(
        <div className="edit-post">
            <input 
                type="textarea"
                value={post}
                onChange={handleSetPost}
                ></input>
            <button 
                className="button-secondary light-back"
                onClick={handlePostSubmit}    
            >Add new post</button>
        </div>
    )
}

export default PostInput