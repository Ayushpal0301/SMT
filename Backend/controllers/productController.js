import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};

// get Product
export const getProductController = async(req,resp)=>{
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1});
        resp.status(200).send({
            success:true,
            message:"All Products",
            TotalCount :products.length,
            products,
        });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success:false,
            message:"Error in getting products",
            error: error.message
        })        
    }
}

// single product
export const getSingleProductController = async(req, resp)=>{
try {
    const product= await productModel.findOne({slug:req.params.slug}).select("-photo").populate('category')
    resp.status(200).send({
        success:true,
        message:"Single Product",
        product
    })
} catch (error) {
    console.log(error);
    resp.status(500).send({
        success:false,
        message:"Error while getting single Product",
        error
    })
}
}

//ProductPhotoController
export const ProductPhotoController=async(req,resp)=>{
    try {
        const product = await productModel.findById(req.params.pid).select("photo")
        if(product.photo.data){
            resp.set('Content-type', product.photo.contentType)
            return resp.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success:false,
            message:"Error to get Photo",
            error
        })
    }
}

// DeleteProductController
export const DeleteProductController=async(req, resp)=>{
try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo")
    resp.status(200).send({
        success:true,
        message:"Product deleted successfull"
    })
} catch (error) {
    console.log(error);
    resp.status(500).send({
        success:false,
        message:"Error to delete product",
        error
    })
}
}

//update product 
export const updateProductController=async(req,resp)=>{
    try {
        const { name, description, price, category, quantity, shipping } =
          req.fields;
        const { photo } = req.files;
        //alidation
        switch (true) {
          case !name:
            return resp.status(500).send({ error: "Name is Required" });
          case !description:
            return resp.status(500).send({ error: "Description is Required" });
          case !price:
            return resp.status(500).send({ error: "Price is Required" });
          case !category:
            return resp.status(500).send({ error: "Category is Required" });
          case !quantity:
            return resp.status(500).send({ error: "Quantity is Required" });
          case photo && photo.size > 1000000:
            return resp
              .status(500)
              .send({ error: "photo is Required and should be less then 1mb" });
        }
    
        const products = await productModel.findByIdAndUpdate(req.params.pid,
            {...req.fields, slug:slugify(name)},{new:true}
        )
        if (photo) {
          products.photo.data = fs.readFileSync(photo.path);
          products.photo.contentType = photo.type;
        }
        await products.save();
        resp.status(201).send({
          success: true,
          message: "Product Update Successfully",
          products,
        });
      } catch (error) {
        console.log(error);
        resp.status(500).send({
          success: false,
          error,
          message: "Error in Update product",
        });
      }
}

//ProductFilters

export const ProductFiltersController=async(req, resp)=>{
try {
  const {checked,radio} =req.body
  let args ={}
  if(checked.length > 0) args.category ={$in: checked};
  if(radio.length === 2) args.price = {$gte: radio[0], $lte:radio[1]};
  const products = await productModel.find(args);
  resp.status(200).send({
    success:true,
    products,
  })  
} catch (error) {
  console.log(error);
  resp.status(500).send({
    success:false,
    error,
    message:"Error in Product Filter"
  })
}
}