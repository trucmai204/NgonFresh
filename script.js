const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const app = express()
const port = 3000

// http logger
app.use(morgan('combined'))

// template engine
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views',path.join(_dirname, 'src/rerources/views'));

app.get('/', (req, res) => { //=>: around function; / định nghĩa tuyến đường
  res.render('Home')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
