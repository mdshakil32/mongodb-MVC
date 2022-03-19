const express = require('express');
const router = express.Router();


const ProductController = require('../Controllers/Product.Controller');

// get all product 
router.get('/',ProductController.getAllProducts )

// create new product 
router.post('/',ProductController.createNewProduct)

// get single product 
router.get('/:id',ProductController.findProductById)

// update single product 
router.patch('/:id',ProductController.updateAProduct)

// delete single product 
router.delete('/:id',ProductController.delteAProduct)


module.exports = router;