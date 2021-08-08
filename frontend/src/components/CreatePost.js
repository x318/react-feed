import { useState } from 'react'
import axios from 'axios'

function CreatePost() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState({})

  function onSubmit(e) {
    const token = sessionStorage.getItem('token')

    const formData = new FormData()
    formData.append('image', image.imageFile)
    formData.append('title', title)
    formData.append('description', description)

    axios
      .post('/feed/', formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res)
      })
    window.location.reload()
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
    <div className="container mx-auto mt-12 rounded-md shadow-md w-4/6 max-w-2xl border-2 bg-white">
      <div className="p-4">
        <h1 className="text-center text-xl font-bold">Create new post</h1>
        {/* <form onSubmit={onSubmit}> */}
        <div className="inputs">
          <div className="p-4 flex flex-col text-center">
            <span className="pb-1">Title</span>
            <input
              placeholder="Enter title..."
              className="p-1 rounded-sm border-b-2 border-gray focus:outline-none transition duration-300 ease-in-out focus-within:border-indigo-500"
              type="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="p-4 flex flex-col text-center">
            <span className="pb-1">Description</span>
            <textarea
              placeholder="Enter description..."
              className="p-1 rounded-sm border-2 border-gray focus:outline-none transition duration-300 ease-in-out focus-within:border-indigo-500"
              type="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center">
            {image.imagePreview ? (
              <img
                alt=""
                onClick={onImageRemove}
                className="mb-4 cursor-pointer"
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
                Upload image
              </label>
            )}
            <button
              className="px-4 py-2 rounded-sm shadow-md my-2 bg-indigo-500 text-white font-bold border-2 transition duration-400 ease-in hover:bg-indigo-600 w-3/4"
              type="submit"
              onClick={onSubmit}
            >
              Post
            </button>
          </div>
        </div>
        {/* </form> */}
      </div>
    </div>
  )
}

export default CreatePost
