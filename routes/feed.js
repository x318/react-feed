const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const multer = require('multer')
const jwt = require('jsonwebtoken')
const prisma = new PrismaClient()

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage: storage })

router.get('', authenticateToken, async (req, res) => {
  let feed = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
    include: {
      usersLiked: true,
      author: true,
      comments: {
        take: 5,
        include: {
          author: true,
        },
      },
    },
  })

  feed = feed.map((el) => {
    let res = el
    res.isLiked =
      el.usersLiked.filter((el) => el.userId === req.user.id).length > 0
    res.usersLiked = el.usersLiked.filter(
      (el) => el.userId !== req.user.id
    ).length
    return res
  })

  res.send({ feed, user: req.user })
})

router.post('', upload.single('image'), authenticateToken, async (req, res) => {
  const { title, description } = req.body
  const newPost = await prisma.post.create({
    data: {
      title: title,
      description: description,
      authorId: req.user.id,
      image: `/uploads/${req.file.originalname}`,
    },
  })

  res.send('Post created!')
})

router.put('/like', authenticateToken, async (req, res) => {
  const { user } = req
  const postId = req.body.id
  const liked = req.body.liked
  if (!liked) {
    await prisma.postsOnUsers.create({
      data: {
        userId: user.id,
        postId: postId,
      },
    })
  } else {
    await prisma.postsOnUsers.deleteMany({
      where: { postId: postId, userId: user.id },
    })
  }
  res.sendStatus(200)
})

router.post('/comment', authenticateToken, async (req, res) => {
  const { user } = req
  const { postId, text } = req.body
  await prisma.comment.create({
    data: {
      authorId: user.id,
      postId: postId,
      text: text,
    },
  })

  res.sendStatus(200)
})

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1].replace(/"/g, '')
  // console.log(token)
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.secret, (err, user) => {
    if (err) {
      console.log(err)
      return res.sendStatus(403)
    }
    req.user = user
    next()
  })
}

module.exports = router
