import { loadPosts } from '../../../services/requests'
import React, { useEffect, useState } from 'react'

import PostShow from './PostShow'

// Show all the post. If owner===true show also an edit post button //

const PostIndex = (props) => {

    const [ visitedUser, setVisitedUser] = useState(undefined)
    const [ posts, setPosts ] = useState([])

    // receives the new posts after the delete request from the postShow,
    // rerendering the remaining one. Could this be more efficient? 

    const handleRenderAfterDelete = (posts) => {
        setPosts(posts.posts.posts)
    }
    
    // this useEffect should check if you are the owner of the profile that you are visiting.
    // if so it will grant you editin and deleting capabilities

    useEffect(() =>{
        setVisitedUser(props.visitedUser)
        const { isOwner } = props
        if(isOwner){
            loadPosts(props.state.id, (err, data)=>{
                if(data){
                    setPosts(data.posts)
                } else {
                    console.log(err)
                }
            })
        } else {
            const id = props.visitedUser.id
            loadPosts(id, (err, data)=>{
                if(data){
                    setPosts(data.posts)        // this was hell... still don't know exactly
                } else {                        // how I did it Arthur, explain me Hooks!!
                    console.log(err)
                }
            }) 
        }
    },[visitedUser, props.visitedUser])

    useEffect(()=>{
    },[posts, setPosts])

    return(
        <div>
            {posts.length>0 ? 
                posts.map(post=>{
                    return (
                        <PostShow
                            id={post._id}
                            key={post._id}
                            handleRenderAfterDelete={handleRenderAfterDelete} 
                            post={post}
                            visitedUserId={visitedUser.id} 
                            isOwner={props.isOwner}/>)
                }) : 'No post!'
            }
        </div>
    )
}

export default PostIndex