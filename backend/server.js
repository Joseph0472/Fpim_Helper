const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 5000

// DB
mongoose.connect('mongodb://localhost/fpim', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on('error', (error) => console.log(error))
db.on('open', () => console.log('Connected to database'))

app.get('/', (req, res) => {
  res.send('Hello World')
})

// Query Items
app.get('/api/cataItems', (req, res) => {
  //const itemsRetrived; // a json file
  //res.json(itemsRetrived)
})


app.use(express.json())

const fpimRouter = require('./routes/fpim')
app.use('/fpim', fpimRouter)
const dhbRouter = require('./routes/DHBLandQ')
app.use('/dhb', dhbRouter)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})