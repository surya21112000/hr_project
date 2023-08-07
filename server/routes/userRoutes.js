const express = require('express')
const {signin,signup}= require('../controllers/user.js')
const router = express.Router()

router.post('/user/signin', signin)
router.post('/user/signup', signup)


module.exports = router;