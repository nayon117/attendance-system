const express = require('express');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const connectDB = require('./db/db');
const User = require('./models/User');

const app = express();

app.use(express.json());

app.post('/register',async (req,res,next)=>{
  const {name,email,password} = req.body;
  if(!name || !email || !password) {
    return res.status(400).json({message:'Invalid data'});
  }
  let user = await User.findOne({email});
  if(user){
    return res.status(400).json({message:'user already exist'});
  }
  try {
    user = new User({name,email,password});
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hash(password, salt);
  user.password = hash;

  await user.save();
  return res.status(201).json({message:'user created successfully',user});
  } catch (error) {
    next(error);
  }
})

app.post('/login',async(req,res,next)=>{
  const {email,password} = req.body;
  try {
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({message:'Invalid credentials'});
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(400).json({message:'Invalid credentials'});
    }
    delete user._doc.password;
    return res.status(200).json({message:'Login Successfull',user});
  } catch (error) {
    next(error);
  }
})

app.get('/', (_req, res) => {
  res.send('welcome to home');
});

app.get('*',(_,res)=>{
    res.send('Thank you for your request');
})

app.use((err, _req, res, _next) => {
  console.log(err);
  res.status(500).json({ message: 'Server Error Occurred' });
});

connectDB(process.env.MONGO_CONNECTION_STRING)
.then(()=>{
  console.log('connected to the database');
  app.listen(5000,()=>{
    console.log('I am listening on port 5000');
})
})
.catch((e)=>{
  console.log(e);
})
