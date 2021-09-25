const router = require('express').Router()
const Dish = require('../models/Dish')
const Chef = require('../models/Chef')
const User = require('../models/User')
const AWS = require('aws-sdk');
const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, AWS_REGION, S3_BUCKET } = process.env

// @route   POST /api/dish/create
// @desc    Create a new dish
// @access  Public
router.post('/create', async (req, res) => {
    try {
        // check if ID of chef related to the dish exists
        const chefExists = await User.findById(req.body.chefID)
        if (!chefExists) { 
            return res.status(500).json({ message: 'El chef no existe'})
        }

        let image = null;

        if (req.body.base64) {
            AWS.config.update({
                accessKeyId: ACCESS_KEY_ID,
                secretAccessKey: SECRET_ACCESS_KEY,
                region: AWS_REGION
            })

            const s3 = new AWS.S3()

            const base64Data = new Buffer.from(req.body.base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');

            const params = {
                Bucket: S3_BUCKET,
                Body: base64Data,
                ACL: 'public-read',
                ContentEncoding: 'base64',
                ContentType: `image/jpeg`,
                Key: `${new Date().toISOString()}.jpeg`
            }

            try {
                const { Location } = await s3.upload(params).promise();
                image = Location;
            } catch (error) {
                console.log(error);
                return res.status(500).json({ message: 'Error al obtener el ', error })
            }
        }

        // Add the new Dish
        const dish = new Dish({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            chefID: req.body.chefID,
            image: image
        })

        // Save in DB
        await dish.save().catch(
            (error) => {
                console.log(error);
                res.status(400).json({ message: "No se pudo crear el platillo", error})
            }
        )
        res.status(200).json({ message: "Platillo creado con éxito" })

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err })
    }

})

// @route   Get /api/dish/:id
// @desc    Get a dish
// @access  Private
router.get('/:id', async (req, res) => {
    try {
        const c = await Dish.findById(req.params.id)
        res.json(c)
    } catch (err) {
        res.status(500).json({ message: err })
    }
})


// @route   Get /api/dish/:id
// @desc    Update a dish
// @access  Private
router.put('/:id', async (req, res) => {
    try {
        const c = await Dish.findByIdAndUpdate(req.params.id, req.body)
        res.json(c)
    } catch (err) {
        res.status(500).json({ message: err })
    }
})

// @route   Delete /api/dish/:id
// @desc    Delete a dish by id
// @access  Private
router.delete('/:id', async (req, res) => {
    try{
        const dish = await Dish.findByIdAndRemove(req.params.id)
        res.json(dish)

    } catch (err) {
        res.status(400).json({ message: err })
    }
})

// @route   Get /api/dish/dishes
// @desc    Get all dishes from a chef
// @access  Private
router.get('/dishes', async (req, res) => {
    try {
        const entry = await Dish.find({})
        var exportDishes = JSON.parse(JSON.stringify(entry))
        for (let i = 0; i < entry.length; i++){
            console.log(entry[i].chefID)
            let user = User.findById(entry[i].chefID)
            exportEntry.user = user
        }
        res.json(exportDishes)
    } catch (err) {
        res.status(500).json({ message: err })
    }
})

module.exports = router

