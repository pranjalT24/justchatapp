import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom";
import Login from './Login/Login'
import Chat from './Chat/Chat'

const App = () => {
    return (
        <div>

            <Switch>
                <Route exact path="/"> <Login /> </Route>
                <Route exact path="/chat"> <Chat /> </Route>
                <Redirect to="/" />
            </Switch>

        </div>
    )
}

export default App
