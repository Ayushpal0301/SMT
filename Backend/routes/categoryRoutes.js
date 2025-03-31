import express from 'express'
import {isAdmin, requireSignIn} from './../middlewares/authMiddleware.js'
import { categoryController, createCategoryController, deletecategoryController, singlecategoryController, updateCategoryController } from '../controllers/categoryController.js'

const router = express.Router()

//routes
//Create Category
router.post('/create-category',requireSignIn,isAdmin,createCategoryController);
//Update Category
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController);
//getall Category
router.get('/get-category',categoryController);
//single Category
router.get('/single-category/:slug',singlecategoryController);
//delete Category
router.delete('/delete-category/:id',requireSignIn,isAdmin,deletecategoryController);



export default router