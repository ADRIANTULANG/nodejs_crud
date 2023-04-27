const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const port = 3000
const userRoutes = require('./routes/User')

app.use('/user', userRoutes)

app.listen(port,()=> {
    console.log("running on port", port)
})

