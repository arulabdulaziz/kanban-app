if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes/index')
const cors = require('cors')
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
const errorHandler = require('./middleware/errorHandler')
app.use('/', routes)

app.use(errorHandler)
app.listen(port, () => {
    console.log(`running web in port ${port}`);
})