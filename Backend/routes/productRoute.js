import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController, DeleteProductController, getProductController, getSingleProductController, ProductFiltersController, ProductPhotoController, updateProductController } from '../controllers/productController.js';
import formindable from 'express-formidable'

const router = express.Router()

// create 
router.post('/create-product',requireSignIn, isAdmin,formindable(),createProductController)

//update product
router.put('/update-product/:pid',requireSignIn, isAdmin,formindable(),updateProductController)


//get Products
router.get('/get-product',getProductController)

//single product
router.get('/get-product/:slug',getSingleProductController)

// get photo
router.get('/product-photo/:pid',ProductPhotoController)

// delete product
router.delete('/delete-product/:pid',DeleteProductController)

//filter product
router.post('/product-filters', ProductFiltersController)

export default router