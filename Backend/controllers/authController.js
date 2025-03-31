import userModel from '../models/Usermodle.js';
import {comparePassword, hashPassword} from '../helpers/authHelper.js'
import JWT from 'jsonwebtoken';


export const registerController= async (req, resp)=>{
    try {
        const {name,email,password,phone,address,question}=req.body
        if(!name){
            return resp.send({message:'Name is Required'})
        }
        if(!email){
            return resp.send({message:'Email is Required'})
        } 
        if(!password){
            return resp.send({message:'Password is Required'})
        } 
        if(!phone){
            return resp.send({message:'Phone No. is Required'})
        } 
        if(!address){
            return resp.send({message:'Address is Required'})
        } 
        if(!question){
            return resp.send({message:'Question is Required'})
        } 
       
        const existingUser = await userModel.findOne({email})

        if(existingUser){
            return resp.status(200).send({
                success:false,
                message:"Already Register Please login"
            })
        }

        const hashedPassword= await hashPassword(password)

        const user = await new userModel({name,email,phone,address,password:hashedPassword,question}).save()
        resp.status(201).send({
            success:true,
            message:"User Register Succesfully",
            user,
        })

    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success:false,
            message: 'Error in Registration',
            error
        })
    }
}

//POST LOGIN

export const loginController= async (req, resp)=>{
try {
    const {email, password}=req.body
    if(!email || !password){
        return resp.status(404).send({
            success:false,
            message:"Invalid email or password"
        })
    }
    //Check User
    const user= await userModel.findOne({email})
    if(!user){
        return resp.status(404).send({
            success:false,
            message:"email is not register"
        })     
    }
    const match=await comparePassword(password,user.password)
    if(!match){
        return resp.status(200).send({
            success:false,
            message:"Invalid password"
        })
    }

    const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d',});
    resp.status(200).send({
        success:true,
        message:"Login Successfully",
        user:{
            name:user.name,
            email:user.email,
            phone:user.phone,
            address:user.address,
            role:user.role,
        },
        token,
    })
} catch (error) {
    console.log(error);
    resp.status(500).send({
        success:false,
        message:'Error in Login',
        error
    })    
}
};

//test Controller

export const testController = (req,resp)=>{
    try {
        resp.send("Protected Routes");
    } catch (error) {
        console.log(error);
        resp.send({error});
        
    }
};


export const forgotPasswordController = async(req,resp)=>{
try {
    const {email,question,newPassword} = req.body
    if (!email) {
        resp.status(400).send({message:'Email is required'})        
    }if (!question) {
        resp.status(400).send({message:'Question is required'})        
    }if(!newPassword){
        resp.status(400).send({message:'New Password is required'})        
    }
    // check
    const user = await userModel.findOne({email,question})

    if(!user){
        return resp.status(404).send({
            success:false,
            message:'Wrong Email and Answer'
        })
    }
    const hashed = await hashPassword(newPassword)
    await userModel.findByIdAndUpdate(user._id,{password:hashed})
    resp.status(200).send({
        success:true,
        message:"Password Reset Successfully",
    });
} catch (error) {
    console.log(error);
    
}
}

