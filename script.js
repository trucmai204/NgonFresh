const path = require('path')
const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000


// http logger
app.use(morgan('combined'))

app.use(express.static('public'));

app.get('/', (req, res) => { //=>: around function; / định nghĩa tuyến đường
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

 

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
