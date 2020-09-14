const express = require('express');
const router = express.Router();
const { check } = require('express-validator');


const { 
    getProductById,  
    createProduct, 
    getProduct, 
    photo,
    updateProduct,
    removeProduct,
    getAllProducts,
    getAllUniqueCategories,
    getProductsByCategory 
} = require('../controllers/product.controllers');

const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth.controllers');
const { getUserById } = require('../controllers/user.controllers');




router.param('userId', getUserById);

router.param('productId', getProductById);

//Create Tshirt/product ONLY ADMIN IS ALLOWED
router.post(
    '/product/create/:userId', 
    isSignedIn, 
    isAuthenticated, 
    isAdmin,
    createProduct
);


router.get('/product/:productId', getProduct);

router.get('/product/photo/:productId', photo);

router.put(
    '/product/:productId/:userId', 
    isSignedIn, 
    isAuthenticated, 
    isAdmin, 
    updateProduct
);

router.delete(
    '/product/:productId/:userId', 
    isSignedIn,
    isAuthenticated,
    isAdmin,
    removeProduct
);

//get all products
router.get('/products', getAllProducts);

//get products by Category
router.get('/products/category/:categoryId', getProductsByCategory)

//get categories
router.get('/product/categories', getAllUniqueCategories)


module.exports = router;