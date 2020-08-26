// src/view/user/Edit.jsx

import React, { useContext, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

// User Profile Edit

import Layout from '../components/Layout.jsx'
import Navbar from '../components/Navbar.jsx'
import Modal from '../static/Modal.jsx'
import { Context } from '../../services/store.js'
import ErrorPage from '../static/Error.jsx'
import { updateUser, uploadPhoto, deleteUser } from '../../services/requests.js'
import { requestUserInfo } from '../../services/requests.js'


const Edit = (props) => {
    
    // error state redirect state global state

    const [ redirect, setRedirect ] = useState(undefined)

    // upload pic state

    const [ state, dispatch ] = useContext(Context)

    // info state

    const [first_name, setFirstName ] = useState('')
    const [last_name, setLastName ] = useState('')
    const [city, setCity ] = useState('')
    const [profilePicture, setProfilePicture ] = useState(undefined)
    const id = props.match.params.id 

    // Handlers

    const handleNameChange = (e) => {
        e.preventDefault()
        setFirstName(e.target.value)
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value)
    }

    const handleCityChange = (e) => {
        setCity(e.target.value)
    }

    // fileloader

    const handleLoadFile = (e) => {
        setProfilePicture(e.target.files[0])
    }


    // This activate the modal to confirm the action ========== //
                                                                //
    const handleDeleteProfile = (e) => {                        //
        e.preventDefault()                                      //
        const modal = document.querySelector('.modal')          //
        modal.style.display = 'Block'                           //
    }                                                           //
                                                                //
    // ======================================================== //

    const deleteProfile = () => {
        const modal = document.querySelector('.modal')
        modal.style.display = 'none'
        deleteUser(state.id, (err, data)=>{
            if(data){
                document.location.href="/"
            } else {
                console.log(err)
            }
        })
    }

    const handleSubmitEdit = (e) => {
        e.preventDefault()
        if(state.isLogged && profilePicture){
            const imageFile = new FormData()
            imageFile.append('image',profilePicture, 'picture name')
            uploadPhoto(imageFile, (err, data)=>{
                if(data){
                    const updateObj = {
                        profile_img: data.imageUrl,
                        first_name, 
                        last_name, 
                        city
                    }              
                    updateUser(state.id, updateObj, (err, data) =>{
                        if(err){
                            console.log(err)
                        } else {
                            dispatch({ type: 'LOAD_USER', payload: data})
                            dispatch({ type: 'IS_LOGGED', payload: true})
                            setRedirect(`/user/${state.id}`)
                        }
                    })
                } else {
                    console.log(err)
                }
            })
        } else if(state.isLogged) {
            const updateObj = {
                first_name,
                last_name,
                city
            }
            updateUser(state.id, updateObj, (err, data)=>{
                if(err){
                    console.log(err)
                } else {
                    dispatch({ type: 'LOAD_USER', payload: data})
                    dispatch({ type: 'IS_LOGGED', payload: true})
                    setRedirect(`/user/${state.id}`)
                }
            })
        }
    }

    // THIS IS TO STAY LOGGED AFTER A RELOAD

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
        setFirstName(state.first_name)
        setLastName(state.last_name)
        setCity(state.city)
    },[])

    // MODAL HANDLERS ============================= //
                                                    //
    const modalHandlers = {                         //
        buttons:[{                                  //
            label: "confirm",                       //
            action: deleteProfile                   //
        }],                                         //
                                                    //
        closeBtn: true                              //
    }                                               //
                                                    //
    // ============================================ //

    return(
        <Layout>
            <Navbar username={state.username}/>
            { state.isLogged ?

                <div className="profile-container appear">
                
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
                            <input 
                                type="file"
                                onChange={handleLoadFile}
                                id="upload-input" 
                            />
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
                        <button
                            onClick={handleDeleteProfile}
                            className="button-secondary"
                        >Cancel profile</button>
                    </div>
                </form>
                </div>
            : <ErrorPage error="not logged"/> }
            <Modal handlers={modalHandlers} message="Do you wanna delete your profile?"/>
        </Layout>
    )
}

export default Edit