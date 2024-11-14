const router = require('express').Router();
const adminAttendance = require('../controllers/admin-attendance');

router.get('/enable',adminAttendance.getEnable);
router.get('/disable',adminAttendance.getDisable);

module.exports = router;
