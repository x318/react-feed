import { useState, useEffect } from 'react'
import axios from 'axios'

import React from 'react'
import FeedItem from './FeedItem'
import CreatePost from './CreatePost'
import Logout from './Logout'

function Feed() {
  const [feedItems, setFeedItems] = useState([])
  const [activeUser, setActiveUser] = useState({})

  function getToken() {
    const tokenString = sessionStorage.getItem('token')
    const userToken = JSON.parse(tokenString)
    return userToken
  }

  const token = getToken()
  useEffect(() => {
    axios
      .get('/feed', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => {
        console.log(resp)
        setFeedItems(resp.data.feed)
        setActiveUser(resp.data.user)
      })
  }, [])

  return (
    <>
      <Logout />
      <CreatePost />
      <div className="feed-container">
        {feedItems.map((item, idx) => (
          <FeedItem
            id={item.id}
            author={item.author.name}
            authorimg={item.author.profilePicture}
            title={item.title}
            description={item.description}
            content={item.image}
            likes={item.usersLiked}
            isLiked={item.isLiked}
            comments={item.comments}
            createdAt={item.createdAt}
            user={activeUser}
            key={idx}
          />
        ))}
      </div>
    </>
  )
}

export default Feed
