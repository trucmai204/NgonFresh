const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const app = express()
const port = 3000


// http logger
app.use(morgan('combined'))

// template engine
app.engine('hbs', handlebars.engine({extname: '.hbs'}))
app.set('view engine', 'hbs')
app.set('views',path.join(__dirname, 'resources/views'))


app.get('/', (req, res) => { //=>: around function; / định nghĩa tuyến đường
  res.render('home')
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
