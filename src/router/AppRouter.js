import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from '../components/Header'
import DashBoard from '../components/dashboard/DashBoard'

const AppRouter = () => (
    <Router>
        <Header />
        <Switch>
            <Route path="/">
                <DashBoard />
            </Route>
        </Switch>
        <Switch>
            <Route exact path="/" component={null} />
        </Switch>
    </Router>
)

export default AppRouter