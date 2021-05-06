import React, { useState } from 'react'
import api from '../utils/api'

import '../styles/Login.css'

const url = "/login"

const Login = ({ setTokenEverywhere }) => {
    const [ user, setUser ] = useState()
    const [ password, setPassword ] = useState()

    const tryToLoginUser = async (credentials) => {
        try {
            const response = await api.post(url, credentials)
            const newToken = response?.data?.token
            setTokenEverywhere(newToken)
        } catch (err) {
            // set some bad credentials alert in UI
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()
        tryToLoginUser({ user, password })
    }

    return (
        <form onSubmit={handleSubmit} >
            <label>
                <p>User:</p>
                <input type="text" onChange={e => setUser(e.target.value)} />
            </label>
            <label>
                <p>Password:</p>
                <input type="password" onChange={e => setPassword(e.target.value)} />
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default Login
