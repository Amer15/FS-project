const { Order, ProductCart } = require('../models/order.models');

exports.getOrderById = (req, res, next, id) => {
    Order.findById({_id: id})
    .populate('products.product', 'name price')
    .exec((err, order) => {
        if(err) return res.status(400).json({
            error:'something went wrong, failed to fetch order'
        });

        req.order = order
        next();
    })
}


exports.createOrder = (req, res) => {
    // console.log(req.body);
    const order = req.body;
    order.user = {_id: req.user};
    // console.log(order);
     //Order From frontend  {
    //        products: [
    //          {
    //            _id: '5f4f499e7afe873fe005a78c',
    //            name: 'Black Tshirt',
    //            description: 'A collection from Code Casuals',
    //            category: 'Casual',
    //            quantity: 1
    //          }
    //        ],
    //        amount: 450,
    //        transaction_id: 'ch_1HQaV4KdRtrYv4PBNhwE9AUo',
    //        user: {_id: jdhuebhejededd}
    // }
    const newOrder = new Order(order);
    newOrder.save((err, order) => {
        if(err) return res.status(400).json({
            error: 'Something went wrong, failed to create order'
        });

        return res.json({
            order
        });
    })
}


exports.getAllOrders = (req, res) => {
    Order.find()
    .populate('user', '_id name')
    .exec((err, orders) => {
        if(err) return res.status(400).json({
            error: 'Something went wrong, failed to fetch orders'
        });

        return res.json(orders);
    });
}

exports.getOrderStatus = (req, res) => {
    return res.json(Order.schema.path('status').enumValues);
}

exports.updateOrderStatus = (req, res) => {
    const { id, status } = req.body;
    Order.update({_id: id},{$set:{status: status}}).exec((err, order) => {
        if(err) return res.status(400).json({
            error: 'Something went wrong, failed to update order'
        });

        return res.json(order);
    })
}


exports.getOrdersByUserId = (req,res) => {
    const userId = req.user;
    console.log(userId);
    Order.find({user: userId}).exec((err, orders) => {
        if(err) return res.status(400).json({
            error: 'Something went wrong'
        });

        if(!orders) return res.status(400).json({
            error: 'No orders found'
        }); 

        return res.json({
            no_of_orders: orders.length,
            orders
        });
    })
}