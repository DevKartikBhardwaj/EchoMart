import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import ConnectDatabase from './Database/connection.js';
import { user } from './Database/Schemas/userSchema.js';
import { createRegistrationOptions } from './utility/helper.js';

dotenv.config();

const app=express();
const PORT= process.env.PORT || 3000;


//middlewares
app.use(express.json());
app.use(cors());

//connecting database
ConnectDatabase();



app.post("/register",async(req,res)=>{
    try {
        const {userEmail}=req.body;
        const userExist=await user.findOne({userEmail});
        if(userExist){
            throw new Error(`seems ${userEmail} already exists in the database`)
        }
        const newUser=await user.insertOne({userEmail});
        const registrationOptions=await createRegistrationOptions(newUser._id);
       
        res.json({status:'success',body:{newUser,registrationOptions}});
    } catch (error) {
        res.json({status:'failed',error:error.message});
    }
})

app.post("/verify-registeration",async(req,res)=>{
    try {
        
       
       
    } catch (error) {
        res.json({status:'failed',error:error.message});
    }
})


app.listen(PORT,()=>console.log(`server is running at ${PORT}`))