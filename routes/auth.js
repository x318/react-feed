const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage: storage })

router.post('/register', upload.single('image'), async (req, res) => {
  // if (!req.body.username || !req.body.password) {
  //   res.json({ success: false, msg: 'No username or password was provided!' })
  // } else if (
  //   await prisma.user.findFirst({
  //     where: {
  //       name: req.body.username,
  //     },
  //   })
  // ) {
  //   res.json({ success: false, msg: 'User already exist!' })
  // } else {
  //   const salt = await bcrypt.genSalt()
  //   const hashedPass = await bcrypt.hash(req.body.password, salt)
  //   const user = await prisma.user.create({
  //     data: {
  //       name: req.body.username,
  //       password: hashedPass,
  //     },
  //   })
  //   res.json({ success: true, msg: 'User created!' })
  // }

  const { username, password } = req.body
  if (!username || !password)
    res.json({ success: false, msg: 'No username or password was provided!' })

  const user = await prisma.user.findFirst({
    where: {
      name: username,
    },
  })
  if (user) res.json({ success: false, msg: 'User already exist!' })

  const salt = await bcrypt.genSalt()
  const hashedPass = await bcrypt.hash(password, salt)
  const newUser = await prisma.user.create({
    data: {
      name: username,
      password: hashedPass,
      profilePicture: `/uploads/${req.file.originalname}`,
    },
  })
  res.json({ success: true, msg: 'User created!' })
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    res.json({ success: false, msg: 'No username or password was provided!' })
  }

  const user = await prisma.user.findFirst({
    where: {
      name: username,
    },
  })

  if (user === null || !(await bcrypt.compare(password, user.password)))
    res.json({ success: false, msg: 'Wrong username or password!' })

  const accesToken = jwt.sign(user, process.env.secret)
  res.json({
    success: true,
    user,
    msg: 'Logged in!',
    token: accesToken,
  })
})

module.exports = router
