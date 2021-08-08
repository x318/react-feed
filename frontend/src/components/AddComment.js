import { useState } from 'react'
import axios from 'axios'
import { ReactComponent as SendIcon } from '../svg/send.svg'

function AddComment({ profilePicture, postId }) {
  const [text, setText] = useState('')

  function handleText(e) {
    e.preventDefault()
    setText(e.target.value)
  }

  function postComment() {
    const token = sessionStorage.getItem('token')
    axios
      .post(
        '/feed/comment',
        { postId, text },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res)
        window.location.reload()
      })
  }

  return (
    <div className="my-3 px-4">
      <div className="flex flex-row">
        <img src={profilePicture} alt="" className="rounded-full h-10 w-10" />
        <textarea
          onChange={handleText}
          value={text}
          cols="30"
          rows="1"
          className="w-full max-h-20 focus:outline-none mx-2 border-2 rounded-md transition duration-300 ease-in-out focus-within:border-indigo-500 px-2 py-1"
        ></textarea>
        <SendIcon
          className="h-12 w-12 p-2 self-center hover:text-indigo-500 cursor-pointer"
          onClick={postComment}
        />
      </div>
    </div>
  )
}

export default AddComment
