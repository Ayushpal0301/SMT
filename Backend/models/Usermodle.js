import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    question:{
       type:String ,
       require:true
    },
    address:{
        type:String,
        require:true,
    },
    role:{
        type:Number,
        default:0
    }
},{timestamps:true})

const userModel = mongoose.model('User',UserSchema);

export default userModel;