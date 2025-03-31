import express from "express";
import {registerController , loginController, testController, forgotPasswordController} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router=express.Router()

//Register Router
router.post('/register',registerController);

//Login Router
router.post('/login',loginController);

//test Router
router.get('/test',requireSignIn,isAdmin,testController);

//Protected user route auth
router.get('/user-auth',requireSignIn,(req,resp)=>{
    resp.status(200).send({ok:true});
});

// forgot password 
router.post('/forgot-password',forgotPasswordController)

//Protected admin route auth
router.get('/admin-auth',requireSignIn,isAdmin,(req,resp)=>{
    resp.status(200).send({ok:true});
});

export default router;