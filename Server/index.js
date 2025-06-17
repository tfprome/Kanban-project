import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import Usermodel from './models/usermodel.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


mongoose.connect('mongodb://localhost:27017/employee')
.then(console.log('db connected'))


const app=express();
app.use(cors())
app.use(express.json());


app.post('/register',async(req,res)=>{
    const {email,password}=req.body;
    //console.log('Received data:', { email, password });
    try{
      const existinguser= await Usermodel.findOne({email:email})
      if(existinguser){
        return res.status(400).json('user already exists')
      }
      const hashedpassword= await bcrypt.hash(password,10)
      const newuser=new Usermodel({email,password:hashedpassword})
      await newuser.save();
      res.status(201).json({ message: 'User created successfully' });
    }
    catch(error){
      console.error(error);
      return res.status(500).json({ message: 'Error during signup', error });
    }
  })



  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await Usermodel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
      const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1d' });
      res.status(200).json({ token });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  });




  app.listen(5000,()=>{
    console.log('Server is running on PORT 5000')
})