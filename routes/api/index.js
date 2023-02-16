
const router = require('express').Router();
const userRoutes = require('./userRoutes')
const dahliaRoutes = require('./dahliaRoutes')

router.use('/users', userRoutes)
router.use('/dahlias', dahliaRoutes)


module.exports = router;