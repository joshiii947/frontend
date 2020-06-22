import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Dashboard from './Components/Dashboard/Dashboard'
import UserShareFile from './Components/SHAREDBYUSER/ShareFile'
import UserShareFolder from './Components/SHAREDBYUSER/ShareFolder'
import ShareWithFile from './Components/SHAREWITHUSER/ShareFiles'
import ShareWithFolder from './Components/SHAREWITHUSER/ShareFolder'
import Unauthorized from './Components/UNAUTHORIZED/unauthorized'
import Logout from './Components/Dashboard/Logout'


function MainRouter() {
    return (
        <div>
            <Switch>

                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/usersharefile" component={UserShareFile} />
                <Route exact path="/usersharefolder" component={UserShareFolder} />
                <Route exact path="/sharefilewithuser" component={ShareWithFile} />
                <Route exact path="/sharefolderwithuser" component={ShareWithFolder} />
                <Route exact path="/unauthorized" component={Unauthorized} />
                <Route exact path="/logout" component={Logout} />
                

            </Switch>
        </div>
    )
}


export default MainRouter;

