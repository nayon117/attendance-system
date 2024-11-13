const router = require('express').Router();
const authRoutes = require('./auth');
const userRoutes = require('./user');

router.use('/api/v1/auth',authRoutes);
router.use('/api/v1/users',userRoutes);

module.exports = router;
