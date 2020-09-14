const express = require('express');
const router = express.Router();

const {
    isSignedIn,
    isAuthenticated,
    isAdmin
} = require('../controllers/auth.controllers');
const { 
    getUserById, 
    getUser, 
    updateUser, 
    updatePassword,
    forgotPassword,
    resetPassword,
    updateUserName,
    userPurchaseList 
} = require('../controllers/user.controllers');




router.param('userId', getUserById);

router.get('/user/:userId', isSignedIn, isAuthenticated, getUser);

router.put('/user/:userId', isSignedIn, isAuthenticated, updateUser);

router.put('/update/password/:userId', isSignedIn, isAuthenticated, updatePassword);

router.put('/update/username/:userId', isSignedIn, isAuthenticated, updateUserName);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password', resetPassword);

router.get('/user/orders/:userId', isSignedIn, isAuthenticated, userPurchaseList);


module.exports = router;