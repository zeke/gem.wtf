const express = require('express')
const app = express()
const wtf = require('./wtf')
const port = Number(process.env.PORT) || 3000

app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] !== 'https') {
    res.redirect('https://gem.wtf' + req.url)
  } else {
    next()
  }
})

app.get('/', (req, res) => {
  res.redirect('https://github.com/zeke/gem.wtf')
})

app.get('/:gemname', async (req, res) => {
  const destinationUrl = await wtf(req.params.gemname)
  return res.redirect(destinationUrl)
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})
