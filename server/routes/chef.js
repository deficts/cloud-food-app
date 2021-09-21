const router = require('express').Router()
const Chef = require('../models/Chef')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// @route   POST /api/chef/register
// @desc    Register a new admin
// @access  Public
router.post('/register', async (req, res) => {
    try {
        // Check if chef already exists
        const emailExists = await Chef.findOne({ email: req.body.email })
        if (emailExists) return res.status(422).send('Email ya existente')

        // Hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        // Add the new Chef
        const chef = new Chef({
            email: req.body.email,
            password: hashedPassword,
            lat: req.body.lat,
            long: req.body.long,
            name: req.body.name,
            lastName: req.body.lastName,
            profileImage: req.body.profileImage
        })

        // Save in DB
        await chef.save().catch(
            (error) => {
                res.status(400).json({ message: "No se pudo crear el chef", error})
            }
        )
        res.status(200).json({ message: "Chef creado con éxito" })

    } catch (err) {
        res.status(500).json({ message: err })
    }

})

// @route   Get /api/chef/:id
// @desc    Get a chef
// @access  Private
router.get('/:id', async (req, res) => {
    try {
        const c = await Chef.findById(req.params.id, { password: false })
        res.json(c)
    } catch (err) {
        res.status(500).json({ message: err })
    }
})

// @route   Get /api/chef/:id
// @desc    Update a chef
// @access  Private
router.put('/:id', async (req, res) => {
    try {
        const c = await Chef.findByIdAndUpdate(req.params.id, req.body)
        res.json(c)
    } catch (err) {
        res.status(500).json({ message: err })
    }
})

// @route POST /api/chef/login
// @desc  Login as chef
// @role  Chef
router.post('/login', async (req, res) => {
    // Check if chef in DB
    const chef = await Chef.findOne({ email: req.body.email }).catch(
        (error) => {
            return res.status(500).json({ message: 'Error al encontrar usuario', error })
        }
    )
    if (!chef) return res.status(404).json({ message: 'Este correo no está registrado' })

    // Check password
    const validPass = await bcrypt.compare(req.body.password, chef.password).catch(
        (error) => {
            return res.status(500).json({ message: 'No fue posible comparar las contrseñas', error })
        }
    )
    if (!validPass) return res.status(403).json({ message: 'Usuario y/o contraseña incorrectos' })

    // Payload
    const payload = {
        chef
    }

    // Create and assign token
    const token = await jwt.sign(payload, process.env.TOKEN_SECRET)

    console.log(token);
    res.status(200).json({ token, chef: payload.chef })
})

module.exports = router