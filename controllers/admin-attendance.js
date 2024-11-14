const { addMinutes, isAfter } = require("date-fns");
const AdminAttendance = require("../models/AdminAttendence");
const error = require("../utils/error");

const getEnable =async (_req,res,next) =>{
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

const getStatus = async(_req,res,next) =>{
  try {
    const running = await AdminAttendance.findOne({status:'RUNNING'});
    if(!running){
      throw error('Not running',400);
    }
    const started = addMinutes(new Date(running.createdAt),running.timelimit);
    if(isAfter(new Date(),started)){
      running.status = "COMPLETED";
      await running.save();
    }
    return res.status(200).json(running);
  } catch (error) {
    next(error)
  }
}

const getDisable = async(_req,res,next) =>{
  try {
    const running = await AdminAttendance.findOne({status:'RUNNING'});
    if(!running){
      throw error('Not running',400);
    }

      running.status = "COMPLETED";
      await running.save();

     return res.status(200).json(running);
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getEnable,getDisable,getStatus
}
