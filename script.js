const express = require('express')
const app = express()
const port = 3000

app.get('/tin-tuc', (req, res) => { //=>: around function; / định nghĩa tuyến đường
  res.send('Hello world')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
