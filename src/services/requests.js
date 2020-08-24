// services/requests.js

// requirements

const server = 'http://127.0.0.1:3001'
var bcrypt = require('bcryptjs');


// ======================================================================================== //


const fetchAPI = async (endPoint, method, data) => {
    const URL = server + endPoint
    const payload = {
            method: method,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/Json',
            },
    }
    if(data){
        payload.body = JSON.stringify(data)
    }
    const response = await fetch(URL, payload)
    return response.json()
}

// USER REGISTRATION

const registerUser = (username, password, cb) => {
    // ash the password
    // TODO: password restriction or verification function

    bcrypt.genSalt(10, (err, salt=10)=>{
        bcrypt.hash(password, salt, (err, hash)=>{
            const userObj = {
                username,
                password: hash
            }
            fetchAPI('/user', 'POST', userObj).then(data=> {
                const err = undefined
                return cb(err, data)
            }).catch(err=>{
                console.log('error', err)   // DEBUG
                const data = undefined
                return cb(err, data)
            })
        })
    })
}

const userLogin = (username, password, cb) => {
    // request a user with same username. Ash the password, compare the password
    // return the cb function is the check is true with the user data
    // before, get rid of the password! :)
    fetchAPI(`/user?username=${username}`, "GET").then(data => {
        console.log(data)
        bcrypt.compare(password, data.password).then((res)=>{
            if(res){
                data.password=undefined
                return cb(undefined, data)
            } else {
                return cb('wrong password', undefined)
            }
        })
    }).catch(err=>{
        return cb(err, undefined)
    })
}

const requestUserInfo = (id, cb) => {
    fetchAPI(`/user/${id}`, 'GET').then(data=> {
        // let err = undefined;
        return cb(undefined, data)
    }).catch(err=>{
        // let data = undefined;
        return cb(err, undefined)
    })
}

const updateUser = (id, data, cb) => {
    fetchAPI(`/user/${id}`, 'PUT', data).then(data=>{
        return cb(undefined, data)
    }).catch(err=>{
        return cb(err, undefined)
    })
}

// FIND PARTIAL MATCHES

const requestMatchingUsers = (regex, cb) => {
    fetchAPI(`/user?regex=${regex}`, 'GET').then(data=>{
        return cb(undefined, data)
    }).catch(err=>{
        return cb(err, undefined)
    })
}

const followUser = (ownerId, userId, cb) => {
    fetchAPI(`/user/${ownerId}/friends/${userId}`, 'POST').then(data=>{
        return cb(undefined, data)
    }).catch(err=>{
        return cb(err, undefined)
    })
}

const unfollowUser = (ownerId, userId, cb) => {
    console.log(userId)
    fetchAPI(`/user/${ownerId}/friends/${userId}`, 'DELETE').then(data=>{
        return cb(undefined, data)
    }).catch(err=>{
        return cb(err, undefined)
    })
}

// POST RELATED REQUESTS

const addNewPost = (userId, postContent, cb) => {
    fetchAPI(`/user/${userId}/posts`, 'POST', {postContent}).then(data=>{
        return cb(undefined, data)
    }).catch(err=>{
        return cb(err, undefined)
    })
}

const loadPosts = (userId, cb) => {
    fetchAPI(`/user/${userId}/posts`, 'GET').then(data=>{
        return cb(undefined, data)
    }).catch(err=>{
        return (err, undefined)
    })
}

const deletePost = (userId, postId, cb) => {
    fetchAPI(`/user/${userId}/posts/${postId}`, 'DELETE').then(data=>{
        return cb(undefined, data)
    }).catch(err=>{
        return(err, undefined)
    })
}

const toggleLike = (userId, visitedProfileId, postId, cb) => {
    fetchAPI(`/user/${visitedProfileId}/posts/${postId}`, 'PUT', {userId}).then(data=>{
        return cb(undefined, data)
    }).catch(err=>{
        return cb(err, undefined)
    })
}

export {
    deletePost, 
    addNewPost,
    loadPosts,
    registerUser, 
    requestUserInfo, 
    toggleLike,
    userLogin, 
    updateUser, 
    requestMatchingUsers, 
    followUser, 
    unfollowUser
}