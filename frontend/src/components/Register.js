import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

function Register({}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState()
  const [image, setImage] = useState({})
  const history = useHistory()

  function registrate() {
    // axios
    // .post('http://localhost:8000/register', { username, password })
    // .then((res) => {
    //   if (res.data.success) history.push('/feed')
    // })

    const formData = new FormData()
    formData.append('image', image.imageFile)
    formData.append('username', username)
    formData.append('password', password)

    axios.post('/auth/register/', formData, {}).then((res) => {
      console.log(res)
      if (res.data.success) history.push('/login')
    })
  }

  function onFileChange(e) {
    setImage({
      imagePreview: URL.createObjectURL(e.target.files[0]),
      imageFile: e.target.files[0],
    })
  }

  function onImageRemove() {
    setImage({})
  }

  return (
    <div className="container mx-auto p-4 mt-12 rounded-md shadow-md w-5/12 max-w-md border-2 bg-white">
      <h1 className="text-center text-2xl font-bold">Registration</h1>
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

        <div className="flex flex-col items-center">
          {image.imagePreview ? (
            <img
              alt=""
              onClick={onImageRemove}
              className="mb-4 cursor-pointer rounded-full w-36 h-36"
              src={image.imagePreview}
            />
          ) : (
            <label className="px-4 py-2 rounded-sm shadow-md my-2 bg-indigo-500 text-white font-bold border-2 transition duration-400 ease-in hover:bg-indigo-600 w-3/4 text-center cursor-pointer">
              <input
                style={{ display: 'none' }}
                type="file"
                accept="image/*"
                onChange={onFileChange}
              />
              Upload profile picture
            </label>
          )}
        </div>

        <div className="flex flex-col">
          <button
            className="px-4 py-2 rounded-sm shadow-md my-4 bg-indigo-500 text-white font-bold border-2 transition duration-400 ease-in hover:bg-indigo-600"
            onClick={() => registrate()}
          >
            Confirm
          </button>
          <button
            className="text-indigo-500 mt-4"
            onClick={() => history.push('/login')}
          >
            To Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register
