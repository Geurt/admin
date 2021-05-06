import React, { useState } from 'react'
import api from '../utils/api'

import Login from './Login'

const Authentication = ({ children }) => {
    // check for existing tokens in localStorage
    const existingToken = JSON.parse(localStorage.getItem("token"))
    // create a loggedIn state using iff existing token
    const [ loggedIn, setLogin ] = useState(!!existingToken)

    // configure axios to send localStorage token in every header
    api.interceptors.request.use(config => {
        const token = JSON.parse(localStorage.getItem("token"))
        config.headers.Authorization = `Bearer ${token}`
        return config
    }, null, { synchronous: true })

    api.interceptors.response.use(null,
        async function(error) {
            // we log out on every non 2xx response by setting an empty token
            // (may limit this here to 4xx in future, and set error state on 5xx)
            setTokenEverywhere()
            return Promise.reject(error)
        }
    )

    const setTokenEverywhere = (newToken) => {
        // log in if new token, out if no token (to trigger rerenders on change)
        setLogin(!!newToken)
        // set token in localStorage (to keep login across windows)
        if (newToken) {
            localStorage.setItem("token", JSON.stringify(newToken))
        } else {
            localStorage.removeItem("token")
        }
    }

    // unless a token is set, we render login on any route
    // (instead of using redirects; this way the user keeps their route)
    if (!loggedIn) return  (
        <Login setTokenEverywhere={ setTokenEverywhere } />
    )

    // otherwise, go ahead!
    return children
}

export default Authentication
