const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const serverless = require('serverless-http')

// dotenv config
dotenv.config()

// connect to database
connectDB()

// Init app
const app = express()

// BodyParser
app.use(express.urlencoded({ extended: true,  limit: '100mb'}));
app.use(express.json({limit: '100mb'}));

// Cross Origin Resource Sharing
app.use(cors({ origin: '*' }))

// Json middleware
app.use(express.json())

// Assign port
const port = process.env.PORT || 5050

// Routes
app.get('/', function (req, res) {
    res.send("Hello Cloud App")
});

app.use('/api/user', require('./routes/user'))
app.use('/api/chef', require('./routes/chef'))
app.use('/api/dish', require('./routes/dish'))

// Listen in port
app.listen(port, () => console.log(`Server listening at port: ${port}`))

// module.exports.handler = serverless(app);