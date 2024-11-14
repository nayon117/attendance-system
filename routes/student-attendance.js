const router = require('express').Router();
const studentAttendance = require('../controllers/student-attendance');

router.get('/status',studentAttendance.getAttendanceStatus);
router.get('/:id',studentAttendance.getAttendance);

module.exports = router;
