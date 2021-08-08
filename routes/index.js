const express = require('express')
const cors = require('cors')
const feed = require('./feed')
const auth = require('./auth')
const router = express.Router()

const corsOpts = {
  origin: '*',

  methods: ['GET', 'POST', 'PUT'],

  allowedHeaders: ['Content-Type', 'Authorization'],
}

router.use(cors(corsOpts))

router.use('/feed', feed)
router.use('/auth', auth)

module.exports = router
