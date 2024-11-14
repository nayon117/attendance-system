const router = require('express').Router();
const authRoutes = require('./auth');
const userRoutes = require('./user');
const authenticate = require('../middleware/authenticate');
const adminRoutes = require('../routes/admin-attendance');
const studentRoutes = require('../routes/student-attendance');

router.use('/api/v1/auth',authRoutes);
router.use('/api/v1/users',authenticate,userRoutes);
router.use('/api/v1/admin/attendance',authenticate,adminRoutes)
router.use('/api/v1/student/attendance',authenticate,studentRoutes)

module.exports = router;
