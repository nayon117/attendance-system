const express = require('express');
require('dotenv').config();
const connectDB = require('./db/db');
const authenticate = require('./middleware/authenticate');
const routes = require('./routes/index')

const app = express();

app.use(express.json());

app.use(routes);

app.get('/private',authenticate, async(_req, res) => {
  
  return res.status(200).json({ message: 'I am a private route' });
 
});

app.get('/', (_req, res) => {
  res.send('welcome to home');
});

// app.get('*',(_,res)=>{
//     res.send('Thank you for your request');
// })

app.use((err, _req, res, _next) => {
  console.log(err);
  const message = err.message ? err.message : 'server error occurred';
  const status = err.status ? err.status : 500;
  res.status(status).json({ message});
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
