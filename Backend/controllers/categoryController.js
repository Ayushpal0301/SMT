import CategoryModel from "../models/CategoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, resp)=>{
    try {
        const {name} = req.body
        if (!name) {
            return resp.status(401).send({message:"Name is require"})            
        }
        const existingCategory = await CategoryModel.findOne({name})
        if(existingCategory){
            return resp.status(200).send({
                success:true,
                message:"Category Already Exists"
            })
        }
        const category = await new CategoryModel({name, slug:slugify(name)}).save()
        resp.status(201).send({
            message:"New Category Created",
            success:true,
            category
        })
        
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success:false,
            error,
            message:'Error in Category'
        })
    }
}

// update category

export const updateCategoryController = async(req, resp)=>{
    try {
        const {name}= req.body
        const {id} = req.params
        const category = await CategoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        resp.status(200).send({
            success:true,
            message:"Category Update successfully",
            category,
        })
        
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success:false,
            error,
            message:"Error while update category"
        })
       
    }
};

// getall Category

export const categoryController= async(req, resp)=>{
    try {
        const category = await CategoryModel.find({})
        resp.status(200).send({
            success:true,
            message:"All Categories list",
            category,
        });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success:false,
            message:"Error in Category",
        })
    }
};

//single Category 
export const singlecategoryController = async(req,resp)=>{
    try {
        const category= await CategoryModel.findOne({slug:req.params.slug})
        resp.status(200).send({
            success:true,
            message:"Get Single Category",
            category
        })
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success:false,
            message:"Error in Category"
        })
    }
};

// delete category
export const deletecategoryController =async(req,resp)=>{
try {
    const {id} = req.params
    const category = await CategoryModel.findByIdAndDelete(id)
    resp.status(200).send({
        success:true,
        message:"Delete Successfully",
    })

} catch (error) {
    console.log(error);
    resp.status(500).send({
        success:false,
        message:"Error in delete"
    })
}
}