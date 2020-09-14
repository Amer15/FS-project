const express = require('express');
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth.controllers');
const { getUserById, updateUserPurchaseList } = require('../controllers/user.controllers');
const { updateProductStock } = require('../controllers/product.controllers');
const { getOrderById, createOrder, getAllOrders, getOrderStatus, updateOrderStatus, getOrdersByUserId } = require('../controllers/order.controllers');


//params
router.param('userId', getUserById);

router.param('orderId', getOrderById);


//Create Order
// router.post(
//     '/order/create/:userId', 
    // isSignedIn, 
    // isAuthenticated,
// updateUserPurchaseList,
// updateProductStock,
//     createOrder
// );

//NEW Create order method
router.post(
    '/order/create/:userId',
    isSignedIn, 
    updateUserPurchaseList,
    isAuthenticated,
    createOrder
);


//Get orders of particular User by UserId
router.get(
    '/order/myorders/:userId',
    isSignedIn, 
    isAuthenticated,
    getOrdersByUserId
)


//Get All Orders - ONLY ADMIN CAN SEE ALL ORDERS
router.get(
    '/order/all-orders/:userId',
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getAllOrders
);

//Status of Order
router.get(
    '/order/status/:userId',
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getOrderStatus
)

router.put(
    '/order/:orderId/status/:userId',
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateOrderStatus
)

module.exports = router;