const router = require('express').Router();
const authRoutes = require('./auth');
const userRoutes = require('./user');
const authenticate = require('../middleware/authenticate');
const adminRoutes = require('../routes/admin-attendance');

router.use('/api/v1/auth',authRoutes);
router.use('/api/v1/users',authenticate,userRoutes);
router.use('/api/v1/admin/attendance',authenticate,adminRoutes)

module.exports = router;
