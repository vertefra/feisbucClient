// src/views/static/Error.jsx

import React from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'

const ErrorPage = (props) => {
    
    return(
    <Layout>
        <h1>some error occurred</h1>
        <h2>{props.error}</h2>
        <Link to="/">Back to main</Link>
    </Layout>
    )
}

export default ErrorPage