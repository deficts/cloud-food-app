const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const AWS = require('aws-sdk');
const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, AWS_REGION, S3_BUCKET } = process.env

// @route   POST /api/user/register
// @desc    Register a new admin
// @access  Public
router.post('/register', async (req, res) => {
    try {
        // Check if user already exists
        const emailExists = await User.findOne({ email: req.body.email })
        if (emailExists) return res.status(422).send('Email ya existente')

        // Hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        let image = null;

        if (req.body.profileImage) {
            AWS.config.update({
                accessKeyId: ACCESS_KEY_ID,
                secretAccessKey: SECRET_ACCESS_KEY,
                region: AWS_REGION
            })

            const s3 = new AWS.S3()

            const base64Data = new Buffer.from(req.body.profileImage.replace(/^data:image\/\w+;base64,/, ""), 'base64');

            const params = {
                Bucket: S3_BUCKET,
                Body: base64Data,
                ACL: 'public-read',
                ContentEncoding: 'base64',
                ContentType: `image/jpeg`,
                Key: `${req.body.email}.jpeg`
            }

            try {
                const { Location } = await s3.upload(params).promise();
                image = Location;
            } catch (error) {
                console.log(error);
                return res.status(500).json({ message: 'Error al encontrar usuario', error })
            }
        }

        // Add the new User
        const user = new User({
            email: req.body.email,
            password: hashedPassword,
            lat: req.body.lat,
            long: req.body.long,
            name: req.body.name,
            lastName: req.body.lastName,
            profileImage: image
        })

        // Save in DB
        await user.save().catch(
            (error) => {
                res.status(400).json({ message: "No se pudo crear el usuario", error })
            }
        )

        const savedUser = await User.findOne({ email: req.body.email }).catch(
            (error) => {
                return res.status(500).json({ message: 'Error al encontrar usuario', error })
            }
        )

        res.status(200).json({ user: savedUser })

    } catch (err) {
        res.status(500).json({ message: err })
    }

})

// @route   Get /api/user/:id
// @desc    Get a user
// @access  Private
router.get('/:id', async (req, res) => {
    try {
        const u = await User.findById(req.params.id, { password: false })
        res.json(u)
    } catch (err) {
        res.status(500).json({ message: err })
    }
})

// @route   Get /api/user/:id
// @desc    Update a user
// @access  Private
router.put('/:id', async (req, res) => {
    try {
        const u = await User.findByIdAndUpdate(req.params.id, req.body)
        res.json(u)
    } catch (err) {
        res.status(500).json({ message: err })
    }
})

// @route POST /api/user/login
// @desc  Login as user
// @role  User
router.post('/login', async (req, res) => {
    // Check if user in DB
    console.log(req);
    const user = await User.findOne({ email: req.body.email }).catch(
        (error) => {
            return res.status(500).json({ message: 'Error al encontrar usuario', error })
        }
    )
    if (!user) return res.status(404).json({ message: 'Este correo no está registrado' })

    // Check password
    const validPass = await bcrypt.compare(req.body.password, user.password).catch(
        (error) => {
            return res.status(500).json({ message: 'No fue posible comparar las contrseñas', error })
        }
    )
    if (!validPass) return res.status(403).json({ message: 'Usuario y/o contraseña incorrectos' })

    // Payload
    const payload = {
        user
    }

    // Create and assign token
    const token = await jwt.sign(payload, process.env.TOKEN_SECRET)

    res.status(200).json({ token, user: payload.user })
})

module.exports = router