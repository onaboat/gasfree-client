require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

const userRoutes = require('./routes/user-routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/users', userRoutes)

mongoose.connect(process.env.MGDB_URL)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})