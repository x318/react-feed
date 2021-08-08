import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { ReactComponent as LikeIcon } from '../svg/like.svg'
import { ReactComponent as CommentIcon } from '../svg/comment.svg'
import AddComment from './AddComment'

function FeedItem({
  id,
  author,
  authorimg,
  title,
  description,
  content,
  likes,
  isLiked,
  comments,
  createdAt,
  user,
}) {
  const [liked, setLiked] = useState(false)

  function handleLike() {
    const token = sessionStorage.getItem('token')
    axios
      .put(
        '/feed/like',
        { id, liked },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setLiked(!liked)
        }
      })
  }

  useEffect(() => {
    console.log(comments)
    setLiked(isLiked)
  }, [])

  return (
    <div className="container mx-auto mt-8 rounded-md shadow-md w-4/6 max-w-2xl border-2 bg-white">
      <div className="p-4 mt-1">
        <div className="flex flex-row">
          <img src={authorimg} alt="" className="rounded-full h-14 w-14" />
          <div className="ml-4 flex flex-col justify-around">
            <h5 className="text-lg font-bold">{author}</h5>
            <a className="text-gray-500">
              published
              {' ' +
                new Date(createdAt).toLocaleDateString('ru-RU', {
                  hour: '2-digit',
                  minute: '2-digit',
                  day: 'numeric',
                  month: '2-digit',
                })}
            </a>
          </div>
        </div>
        <div className="flex flex-col mb-6">
          <div className="my-4">
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="">{description}</p>
          </div>
          <img src={content} alt="" className="self-center p-2" />
        </div>
        <div className="border-b-2 my-2"></div>
        <div className="mt-4">
          <div className="flex flex-row max-w-min p-1">
            {liked ? (
              <LikeIcon
                className="h-6 hover:text-indigo-500 text-indigo-500  cursor-pointer"
                onClick={() => handleLike()}
              />
            ) : (
              <LikeIcon
                className="h-6 hover:text-indigo-500  cursor-pointer"
                onClick={() => handleLike()}
              />
            )}
            <span className="text-xl ml-2 inline-block">
              {liked ? likes + 1 : likes}
            </span>
            <CommentIcon
              className="h-6 hover:text-indigo-500  cursor-pointer ml-5"
              onClick={() => handleLike()}
            />
            <span className="text-xl ml-2 inline-block">{comments.length}</span>
          </div>
        </div>
      </div>
      <div className="border-t-2 my-2 px-4">
        {comments.map((comment, idx) => (
          <div key={idx}>
            <div className="flex flex-row mt-4">
              <img
                src={comment.author.profilePicture}
                alt=""
                className="rounded-full h-10 w-10"
              />
              <div className="ml-4 flex flex-col justify-around">
                <h5 className="text-base font-semibold text-indigo-500">
                  {comment.author.name}
                </h5>
                <p className="">{comment.text}</p>
                <p className="text-gray-500">
                  {' ' +
                    new Date(comment.createdAt)
                      .toLocaleDateString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit',
                        day: 'numeric',
                        month: '2-digit',
                      })
                      .replace(',', '')}
                </p>
              </div>
            </div>

            <div className="border-b-2 my-1 mx-2 h-px"></div>
          </div>
        ))}
      </div>
      <AddComment profilePicture={user.profilePicture} postId={id} />
    </div>
  )
}

export default FeedItem
