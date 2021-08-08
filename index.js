const express = require('express')
const path = require('path')
const routes = require('./routes/index')

const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json({ extended: false }))

app.use(express.static(__dirname + '/public'))

app.use(routes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend', 'build')))
}

if (process.env.NODE_ENV === 'production') {
  app.use('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
  )
}
app.use(routes)

app.listen(process.env.PORT || 8000)
