const router = require('express').Router();
const userController = require('../controllers/users');

// findone, update, delete via id
router.get('/:userId',userController.getUserById);
router.put('/:userId',()=>{});
router.patch('/:userId',()=>{});
router.delete('/:userId',userController.deleteUserById);

// find all data and create data
router.get('/',userController.getUsers);
router.post('/',userController.postUser);

module.exports= router;
