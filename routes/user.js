const router = require('express').Router();
const userController = require('../controllers/users');

// findone, update, delete via id
router.get('/:userId',userController.getUserById);
router.put('/:userId',()=>{});
router.patch('/:userId',()=>{});
router.delete('/:userId',()=>{});

// find all data and create data
router.get('/',userController.getUsers);
router.post('/',()=>{});

module.exports= router;
