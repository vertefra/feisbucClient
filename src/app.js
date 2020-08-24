// src/app.js

import React from 'react'
import New from './views/user/New.jsx';
import Store from './services/store.js'
import AppRouter from './controllers/Router.jsx'
import './style/App.scss'

// ACCESS POINT OF THE STORE 

const App = (props) => {
    
    return(
        <Store>
            <AppRouter>
                <New />
            </AppRouter>
        </Store>
    )
}

export default App
