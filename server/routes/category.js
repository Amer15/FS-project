const express = require('express');
const router = express.Router();

const { 
    getCategoryById, 
    createCategory, 
    getCategory, 
    getAllCategories, 
    updateCategory,
    removeCategory 
} = require('../controllers/category.controllers');
const { isSignedIn, isAdmin, isAuthenticated } = require('../controllers/auth.controllers');
const { getUserById } = require('../controllers/user.controllers');



router.param('userId', getUserById);

router.param('categoryId', getCategoryById);


router.post(
    '/category/create/:userId',
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createCategory
);

router.get('/category/all-categories', getAllCategories);

router.get('/category/:categoryId', getCategory);


router.put(
    '/category/:categoryId/:userId', 
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateCategory
);

router.delete(
    '/category/:categoryId/:userId', 
    isSignedIn,
    isAuthenticated,
    isAdmin,
    removeCategory
);


module.exports = router;