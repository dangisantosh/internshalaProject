const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Apifeatures = require("../utils/apifeatures");


//create product -- ADMIN
exports.createProduct = catchAsyncErrors(async(req, res, next)=>{
    const product = await Product.create(req.body);
    res.status(200).json({success:true, product});
})

//GET ALL PRODUCTS
exports.getAllProducts = catchAsyncErrors(async(req, res)=>{

    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

    const apifeature = new Apifeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage)
    const products = await apifeature.query

    res.status(200).json({success:true, products, productCount})
})

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
           return next(new ErrorHander("Product not found", 404));
        }
    
    res.status(200).json({
        success:true,
        product
    })
})

//Update product - -Admin

exports.updateProduct = catchAsyncErrors(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHander("Product not found", 404));
     }
    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({success:true, product})
})

//Delete a product

exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHander("Product not found", 404));
     }
    await product.deleteOne();
    res.status(200).json({success:true, message:'Product deleted successfully' })
})

