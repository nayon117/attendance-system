const userService = require('../service/user');

const getUserById = async(req,res,next) =>{
  const userId = req.params.userId;
  try {
    const user = await userService.findUserByProperty('_id',userId);
    if(!user){
      throw error('user not found', 404);
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error)
  }

}
const putUserById = (req,res,next) =>{}
const patchUserById = (req,res,next) =>{}
const deleteUserById = (req,res,next) =>{}

const getUsers = async(_req,res,next) =>{
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
