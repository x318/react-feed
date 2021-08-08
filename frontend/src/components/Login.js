import { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

function Login({ setToken }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState()
  const history = useHistory()

  function handleLogin() {
    axios.post('/auth/login', { username, password }).then((res) => {
      console.log(res.data)
      if (res.data.success) {
        setToken(res.data.token, res.data.user.id)
        history.push('/feeds')
      } else setMessage(res.data.msg)
    })
  }

  return (
    <div className="container mx-auto p-4 mt-12 rounded-md shadow-md w-5/12 max-w-md border-2 bg-white">
      <h1 className="text-center text-2xl font-bold">Login</h1>
      <div className="p-4">
        {message ? <h4>{message}</h4> : ''}
        <div className="p-4 flex flex-col text-center">
          <span className="pb-1">Username</span>
          <input
            className="p-1 rounded-sm border-b-2 border-gray focus:outline-none transition duration-300 ease-in-out focus-within:border-indigo-500"
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="p-4 flex flex-col text-center">
          <span className="pb-1">Password</span>
          <input
            className="p-1 rounded-sm border-b-2 border-gray focus:outline-none transition duration-300 ease-in-out focus-within:border-indigo-500"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <button
            className="px-4 py-2 rounded-sm shadow-md my-4 bg-indigo-500 text-white font-bold border-2 transition duration-400 ease-in hover:bg-indigo-600"
            onClick={() => handleLogin()}
          >
            Confirm
          </button>
          <button
            className="text-indigo-500 mt-4"
            onClick={() => history.push('/register')}
          >
            To Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
