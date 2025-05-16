import mongoose from "mongoose";


    const userSchema=new mongoose.Schema({
        userEmail:{
            type:String,
            require:true,
            unique:true
        },
        register:{
            type:Boolean,
            default:false
        },
        RegistrationOptions:{
            type:Object,
            default:{}            
        }
    },{timestamps:true})

export const user= mongoose.model('user',userSchema);