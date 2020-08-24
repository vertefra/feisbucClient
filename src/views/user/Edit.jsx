// src/view/user/Edit.jsx

import React, { useContext, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

// User Profile Edit

import Layout from '../components/Layout.jsx'
import Navbar from '../components/Navbar.jsx'
import { Context } from '../../services/store.js'
import ErrorPage from '../static/Error.jsx'
import { updateUser } from '../../services/requests.js'


const Edit = (props) => {
    
    // error state redirect state global state

    const [ redirect, setRedirect ] = useState(undefined)
    const [ error, setError ] = useState(undefined)

    // upload pic state

    const [ state, dispatch ] = useContext(Context)

    // info state

    const [first_name, setFirstName ] = useState(state.first_name)
    const [last_name, setLastName ] = useState(state.last_name)
    const [city, setCity ] = useState(state.city)
    const id = props.match.params.id 

    // Handlers

    const handleNameChange = (e) => {
        console.log(e)
        setFirstName(e.target.value)
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value)
    }

    const handleCityChange = (e) => {
        setCity(e.target.value)
    }

    const handleSubmitEdit = (e) => {
        e.preventDefault()
        const updateObj = {first_name, last_name, city}
        if(state.isLogged){
            updateUser(state.id, updateObj, (err, data) =>{
                if(err){
                    console.log(err)
                    setError(err)
                } else {
                    console.log('working here')
                    dispatch({ type: 'LOAD_USER', payload: data})
                    dispatch({ type: 'IS_LOGGED', payload: true})
                    setRedirect(`/user/${state.id}`)
                }
            } )
        }
    }

    useEffect(()=>{
    })

    return(
        <Layout>
            <Navbar username={state.username}/>
            { state.isLogged ?
                <div className="profile-container">
                
                { redirect && <Redirect from='/user/:id' to={`${redirect}`}/> }
   
                <form className="access-form">
                    <div>
                        <fieldset>
                            <legend> Profile </legend>
                            <figure>
                                <img
                                    className="profile-pic dark-border" 
                                    src={state.profile_img}
                                    width={'100px'} 
                                    alt='your profile picture'
                                />
                            </figure>
                            <label>Upload an Image for profile</label><br/>
                            <input type="file"/>
                        </fieldset>
                        <fieldset>
                            <legend>Info </legend>
                            <div className="form-field">
                                <label>First Name </label>
                                <input
                                    className="access-input" 
                                    type="text" 
                                    onChange={handleNameChange} 
                                    value={first_name}/>
                            </div>
                            <div className="form-field">
                                <label>Last Name </label>
                                <input
                                    className="access-input" 
                                    type="text" 
                                    onChange={handleLastNameChange} 
                                    value={last_name}/>
                            </div>
                            <div className="form-field">
                                <label>City </label>
                                <input
                                    className="access-input" 
                                    type="text"
                                    onChange={handleCityChange}
                                    value={city}
                                />
                            </div>
                        </fieldset>
                    </div>
                    <div className="access-input">
                        <button 
                            onClick={handleSubmitEdit}
                            className="button-secondary"
                        >Done!</button>
                    </div>
                </form>
                </div>
            : <ErrorPage error="not logged"/> }
        </Layout>
    )
}

export default Edit