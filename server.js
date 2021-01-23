const express = require('express')
const app = express()
const wtf = require('./wtf')
const port = Number(process.env.PORT) || 3000

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
