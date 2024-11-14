const AdminAttendance = require("../models/AdminAttendence");
const error = require("../utils/error");

const getEnable =async (req,res,next) =>{
  try {
    const running = await AdminAttendance.findOne({status:'RUNNING'});
    if(running){
      throw error('Already running',400);
    }
    const attendance = new AdminAttendance();
    await attendance.save();
    return res.status(201).json({message:"success",attendance})
  } catch (error) {
    next(error)
  }
}
const getDisable = (req,res,next) =>{}

module.exports = {
  getEnable,getDisable
}
