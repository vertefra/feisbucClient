import React from 'react'
import { Link } from "react-router-dom"

const FriendCard = (props) =>{
    const friend = props.friend
    const id = friend._id ? friend._id : friend.id
    return(
        <div className="card appear scale">
            <Link to={`/user/${id}`}>
                <figure>
                    <img
                        className="profile-pic " 
                        src={friend.profile_img}
                        width='80px'
                        height="80px"
                        alt='img profile'
                    />
                </figure>
            </Link>
            <h3 className="card-username">{friend.username}</h3>
            <h3 className="card-name">{friend.first_name}</h3>
            <h3 className="card-name">{friend.last_name}</h3>
            <h3 className="card-city">{friend.city}</h3>
        </div>
    )
}

export default FriendCard