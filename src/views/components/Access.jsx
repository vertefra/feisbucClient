// src/views/components/Form.jsx

import { registerUser, userLogin } from '../../services/requests.js'
import { Context } from '../../services/store.js'
import { Redirect } from 'react-router-dom'
import React, { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'

const Access = (props) => {

    // global state access

    const [state, dispatch] = useContext(Context)

    // error state

    const [error, setError] = useState(undefined)
    
    // hooks for signup
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ validatePsw, setValidatePsw ] = useState('')
    const [ valid, setValid ] = useState(false)

    // hooks for login
    const [ usrLogin, setUsrLogin ] = useState('')
    const [ pswLogin, setPswLogin ] = useState('')
    const [ redirect, setRedirect ] = useState(undefined)

    // :TODO create a function to check that username is unique
    // refactor in two different component, please!!! :)
    
    // SIGNIN HANDLERS

    const handleUsername = (e) => {
            setUsername(e.target.value)
    }
    
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    
    const handleValidate = (e) => {
        setValidatePsw(e.target.value)
    }

    // LOGIN HANDLERS

    const handlePswLogin = (e) => {
        setPswLogin(e.target.value)
    }

    const handleUsrLogin = (e) => {
        setUsrLogin(e.target.value)
    }

    const handleRegisterUser = (e) => {
        e.preventDefault()
        registerUser(username, password, (err, user_id)=>{
            if(err){
                console.log(err)
                dispatch({ type: 'SET_ID', payload: undefined})
                dispatch({ type: 'IS_AUTH', payload: false})
            } else {
                dispatch({ type: 'SET_ID', payload:user_id})
                dispatch({ type: 'IS_AUTH', payload: true})
                dispatch({ type: 'IS_LOGGED', payload: true})
            }
        })
    }

    const handleLogin = (e) =>{
        e.preventDefault()
        userLogin(usrLogin, pswLogin, (err, data)=>{
            if(err){
                console.log(err)
                                            // setting state and redirect for page error
                setRedirect('/error')       // set redirect to error page
                setError(err)
                dispatch({ type:'SET_AUTH', payload: true})     // in order to trigger useEffect redirect
                dispatch({ type: "IS_LOGGED", payload: false})  // don't have access to anything
            } else {
                console.log(data)
                dispatch({ type: 'SET_ID', payload:data.id})
                dispatch({ type: 'IS_AUTH', payload: true})
                dispatch({ type: 'IS_LOGGED', payload: true})
            }
        })
    }

    useEffect(() => {
        if(password===validatePsw && password!==''){
            setValid(true)
        } else {
            setValid(false)
        }
    },[password, validatePsw])

    useEffect(()=> { 
        if(state.isAuth){
            setRedirect(`/user/${state.id}`)
        }
    },[state, setRedirect])

    return(
        <div className="entry-page">
            { redirect && <Redirect error={error} from="/" to={`${redirect}`}/> }
            <fieldset>
                <legend>Sign up</legend>
                <form className="access-form">
                    <div className='form-field'>
                        <label>Username</label>
                        <input
                            className="access-input" 
                            type="text"
                            value={username}
                            onChange={handleUsername}
                        />
                    </div>
                    <div className='form-field'>
                        <label>Password</label>
                        <input 
                            className="access-input"
                            type="password"
                            onChange={handlePassword}
                            value={password}
                        />
                    </div>
                    <div className='form-field'>
                        <label>Confirm</label>
                        <input 
                            className="access-input"
                            type="password"
                            value={validatePsw}
                            onChange={handleValidate}
                        />
                    </div>
                    <div className='form-field'>
                    { 
                        valid
                            ? <button
                                className="button-primary" 
                                onClick={handleRegisterUser}
                                >Create Profile</button>
                            : <h4 className="flash">passwords dont match</h4>
                    }
                    </div>
                </form>
            </fieldset>

        {/* Login form, This need a nice refactor in two separate components */}

            <fieldset>
                <legend>Log In</legend>
                <form className="access-form">
                    <div className='form-field'>
                        <label>Username</label>
                            <input 
                                className="access-input"
                                type="text"
                                value={usrLogin}
                                onChange={handleUsrLogin}
                            />
                    </div>
                    <div className="form-field">
                        <label>Password</label>
                        <input 
                            className="access-input"
                            type="password"
                            onChange={handlePswLogin}
                            value={pswLogin}
                        />
                    </div>
                    <div className="form-field">
                        <button 
                        onClick={handleLogin}
                        className="button-primary light-shadow"
                        >login</button>
                    </div>
                </form>
            </fieldset>
        </div>
    )
}

export default Access