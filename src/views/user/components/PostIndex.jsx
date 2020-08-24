import React, { useEffect, useState, useContext } from 'react'
import PostShow from './PostShow'
import { loadPosts } from '../../../services/requests'
import { Context } from '../../../services/store'

// Show all the post. If owner===true show also an edit post button

const PostIndex = (props) => {

    const [ visitedUser, setVisitedUser] = useState(undefined)
    const [ posts, setPosts ] = useState([])

    const handleRenderAfterDelete = (posts) => {
        console.log('posts after delete', posts.posts.posts)
        setPosts(posts.posts.posts)
    }
    
    useEffect(() =>{
        setVisitedUser(props.visitedUser)
        const {isOwner, state} = props
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
                    // this was hell... still don't know exactly how I did it
                    setPosts(data.posts)
                } else {
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