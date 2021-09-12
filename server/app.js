const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

// dotenv config
dotenv.config()

// Init app
const app = express()

// BodyParser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Cross Origin Resource Sharing
app.use(cors({ origin: '*' }))

// Json middleware
app.use(express.json())

// Assign port
const port = process.env.PORT || 5050

// Routes
app.get('/',function(req,res){
    res.send("Hello Cloud App")
});

// Listen in port
app.listen(port, () => console.log(`Server listening at port: ${port}`))