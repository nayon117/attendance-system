const { addMinutes, isAfter } = require("date-fns");
const AdminAttendance = require("../models/AdminAttendence");
const StudentAttendance = require("../models/StudentAttendence");
const error = require("../utils/error");


const getAttendance = async (req, res, next) => {
  const {id} = req.params;
  try {
    const adminAttendance = await AdminAttendance.findById(id);
    if(!adminAttendance) {
      throw error('Invalid Attendance Id',400);
    }
    if(adminAttendance.status === 'COMPLETED'){
      throw error('Attendance Already Completed',400);
    }

    let attendance = await StudentAttendance.findOne({
      adminAttendance:id,
      user:req.user._id
    })
    if(attendance){
      throw error('Already Registered',400);
    }
    attendance = new StudentAttendance({
      user:req.user._id,
      adminAttendance:id
    })
    await attendance.save();
    return res.status(201).json({message:"success",attendance});

  } catch (error) {
    next(error);
  }
};
const getAttendanceStatus = async (_req, res, next) => {
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
};

module.exports = {
  getAttendance,
  getAttendanceStatus,
};
