const userService = require('../service/user');

const getUserById = (req,res,next) =>{}
const putUserById = (req,res,next) =>{}
const patchUserById = (req,res,next) =>{}
const deleteUserById = (req,res,next) =>{}

const getUsers = async(req,res,next) =>{
  try {
    const user = await userService.findUsers();
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}
const postUser = (req,res,next) =>{}

module.exports = {
  getUserById,putUserById,patchUserById,deleteUserById,getUsers,postUser
}
