import { useState, useEffect } from 'react'
import { login } from '../services/loginService'
import PropTypes from 'prop-types'

export const Login = ({ handleCredentials, setLoginState, setMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      handleCredentials(user)
      setLoginState(true)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await login({
        username,
        password,
      })
      handleCredentials(user)
      setLoginState(true)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      setMessage({ content: 'Incorrect password or username', type: 'error' })
      setTimeout(() => {
        setMessage({})
      }, 5000)
    }
  }

  return (
    <>
      <h2>Blog site login</h2>

      <form action="submit" onSubmit={(e) => handleLogin(e)}>
        <label htmlFor="username">Username</label>
        <input
          data="username-input"
          type="text"
          name="username"
          id="username"
          required
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          data="password-input"
          type="password"
          name="password"
          id="password"
          required
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type="submit" data="login-button">
          Login
        </button>
      </form>
    </>
  )
}

Login.propTypes = {
  handleCredentials: PropTypes.func.isRequired,
  setLoginState: PropTypes.func.isRequired,
  setMessage: PropTypes.func,
}
