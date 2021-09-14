const express = require('express')
const axios = require('axios')
const app = express()
const port = process.env.PORT || 888

// Error handler
require('express-async-errors')

// Server configuration
app.set('etag', false)
app.enable('trust proxy')
app.disable('x-powered-by')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Route management
app.get('/:url', async function (req, res) {
  const resRequest = await axios.get(new Buffer(req.params.url, 'base64').toString('ascii'))
  return res.send(resRequest.data)
})

// 404 middleware express
app.use('*', function (req, res) {
  return res.redirect(301, 'https://google.com')
})

// Error middleware express
app.use((err, req, res, next) => {
  return res.status(200).json({ success: false, message: err.message })
})

// Listen port
app.listen(port, () => console.log(`Server is running on port ${port}!`))