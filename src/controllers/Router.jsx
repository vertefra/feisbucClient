// src/controllers/Router.jsx

import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Show from '../views/user/Show.jsx'
import New from '../views/user/New.jsx'
import ErrorPage from '../views/static/Error.jsx'
import Edit from '../views/user/Edit.jsx'
import Index from '../views/user/Index.jsx'
import FriendIndex from '../views/friend/FriendIndex.jsx'
import PostIndexFeed from '../views/user/PostIndexFeed.jsx'

const AppRouter = ({children}) => {
    return(
        <Router>
            <Switch>
                <Route exact={true} path="/" component={New}></Route>
                <Route exact={true} path="/user" component={Index}></Route>
                <Route  exact={true} path="/user/:id" component={Show}></Route>
                <Route exact={true} path="/user/:id/edit" component={Edit}/>
                <Route exact={true} path="/user/:id/friends" component={FriendIndex}/>
                <Route exact={true} path="/user/:id/posts" component={PostIndexFeed}/>
                <Route exact={true} path="/error" component={ErrorPage}/>
            </Switch>
        </Router>
    )
}

export default AppRouter