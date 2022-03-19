const mongoose = require('mongoose');
const createError = require('http-errors');
const Product = require('../Models/Product.model');


module.exports={
    getAllProducts :async (req,res,next)=>{
        try{
            const results = await Product.find({},{__v: 0});
            res.send(results);
        }
        catch(error){
            console.log(error.message)
        }
    },
    createNewProduct:async(req,res,next)=>{
        // save method 1
        try{
            const product = new Product(req.body);
            const result = await product.save();
            res.send(result);
        }
        catch(error) {
            console.log(error.message);
            if(error.name === 'ValidationError' ){
                return next(createError(422,error.message))
            }
            next(error)
        }

        // save method 2

        // product.save()
        // .then(result => {
        //     console.log(result);
        //     res.send(result);
        // })
        // .catch(err=>{
        //     console.log(err.message)
        // })
    
    },
    findProductById:async(req,res,next)=>{
        const id = req.params.id;
        try{
            const product =await Product.findById(id);
            if(!product){
                throw createError(404,'Product does not exist')
            }
            res.send(product);
        }
        catch(error){
            console.log(error.message);
            if(error instanceof mongoose.CastError){
        
                return  next(createError(400,"Invalid Product Id"));
            }
            next(error)
        }
    },
    updateAProduct:async(req,res,next)=>{
        try{
            const id = req.params.id;
            const updates =  req.body;
            const options = {new:true}

            const result =await Product.findByIdAndUpdate(id,updates,options);
            if(!result){
                throw createError(404,'Product does not exist')
            }
            res.send(result)
        }
        catch(error){
            console.log(error.message);
            if(error instanceof mongoose.CastError){
            
                return next(createError(400,'Invalid Product Id'));
            }
            next(error)
        }

    },
    delteAProduct:async(req,res,next)=>{
    const id = req.params.id;
    try{
        const result = await Product.findByIdAndDelete(id);
        if(!result){
            throw createError(404,'Product does not exist')
        }
        res.send(result);

    }
    catch(error){
        console.log(error.message);
        if(error instanceof mongoose.CastError){
            
            return next(createError(400,"Invalid Product Id"));
        }
        next(error)
    }
}

}