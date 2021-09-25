const router = require('express').Router()
const Dish = require('../models/Dish')
const Chef = require('../models/Chef')
const User = require('../models/User')



// @route   POST /api/dish/create
// @desc    Create a new dish
// @access  Public
router.post('/create', async (req, res) => {
    try {

        // check if ID of chef related to the dish exists
        const chefExists = await Chef.findById(req.body.chefID)
        if (!chefExists) { return res.status(500).json({ message: err})}

        // Add the new Dish
        const dish = new Dish({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            chefID: req.body.chefID
        })

        // Save in DB
        await dish.save().catch(
            (error) => {
                res.status(400).json({ message: "No se pudo crear el platillo", error})
            }
        )
        res.status(200).json({ message: "Platillo creado con éxito" })

    } catch (err) {
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
            let user = User.findById(entry[i].chefID)
            exportEntry.user = user
        }
        res.json(exportDishes)
    } catch (err) {
        res.status(500).json({ message: err })
    }
})


// @route   Get /api/dish/dishes
// @desc    Get all dishes from a chef
// @access  Private

router.get('/dishes', async (req, res) => {
    try {
        const entry = await Dish.find({})
        var exportEntry = JSON.parse(JSON.stringify(entry))
        for (let i = 0; i < entry.length; i++){
            let chef = Chef.findById(entry[i].chefID)
            exportEntry.chef = chef
        }
        res.json(exportEntry)
    } catch (err) {
        res.status(500).json({ message: err })
    }
})