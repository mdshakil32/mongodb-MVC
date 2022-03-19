const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// connect with database 
mongoose.connect("mongodb://localhost:27017/Restapi_youtube")
.then(()=>console.log('MOGODB connected...'))
.catch((err)=>console.log(err.message))

// product route 
const ProductRoute = require('./Routes/Product.route');

app.use('/products',ProductRoute);


// 404 handler and pass to error handler 
app.use((req,res,next)=>{
    next(createError(404,'Not Found'))

    // const err = new Error("Not Found");
    // err.status=404;
    // next(err);
})

// error handler 
app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.send({
        error:{
            status: err.status|| 500,
            message: err.message
        }
    })

})

app.listen(3000,()=>{
    console.log('server running at 3000');
})