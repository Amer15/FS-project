const Product = require('../models/product.models');
const { validationResult } = require('express-validator');
const formidable = require('formidable');
const fs = require('fs');


exports.getProductById = (req, res, next, id) => {
    Product.findById({ _id: id })
    .populate('category', 'name _id')
    .exec((err, product) => {
        if (err) return res.status(400).json({
            error: 'Something went wrong, failed to fetch product'
        });

        req.product = product;
        next();
    })
}

exports.getProductsByCategory = (req, res) => {
    const { categoryId } = req.params;

    Product.find({ category: categoryId }, {photo: 0})
    .populate('category', 'name _id')
    .exec((err, products) => {
        if (err) return res.status(400).json({
            error: 'Something went wrong, failed to fetch product'
        });

        if(!products) return res.status(400).json({
            error: 'No products found'
        });

        return res.json(products);
    })
}


exports.createProduct = (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) return res.status(400).json({
            error: 'something went wrong'
        });

        //Destructering all fields
        const { name, description, price, category, total_units } = fields;
        if (!name || !description || !category || !price || !total_units) {
            return res.status(400).json({
                error: 'please fill all fields'
            })
        }
        // console.log(fields);
        // console.log(file);

        let product = new Product();
        product.name = name;
        product.description = description;
        product.category = category;
        product.price = price;
        product.total_units = total_units;

        //Handling photo
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: 'Image is too large'
                })
            }

            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        //Save to DB
        product.save((err, product) => {
            if (err) return res.status(400).json({
                error: 'something went wrong'
            });

            return res.json({
                message: 'product saved successfully'
            })
        })
    })

}


//Not sending photo directly instead sending it as middleware to optimize
exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

//Middleware
exports.photo = (req, res, next) => {
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data)
    }
    next();
}

//update product
exports.updateProduct = (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) return res.status(400).json({
            error: 'something went wrong'
        });

        console.log(fields);
        console.log(file);

        //coming from param middleware
        let product = req.product;

        product.name = fields.name;
        product.description = fields.description;
        product.category = fields.category;
        product.price = fields.price;
        product.total_units = fields.total_units;

        //Handling photo
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: 'Image is too large'
                })
            }

            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        //Save to DB
        product.save((err, product) => {
            if (err) return res.status(400).json({
                error: 'something went wrong'
            });

            return res.json({
                message: 'product saved successfully',
                product
            })
        })
    })
}

//delete product
exports.removeProduct = (req, res) => {
    Product.findByIdAndDelete({_id: req.product._id}).exec((err, removedProduct) =>{
        if(err) return res.status(400).json({
            error:'failed to delete product'
        });

        return res.json({
            message:'product deleted successfully',
            removedProduct
        })
    })
}

//getAllproducts
exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';  
  Product.find({},{photo:0})
  .populate('category')
  .sort([[sortBy, 'asc']])
  .limit(limit)
  .exec((err, products) => {
      if(err) return res.json({
          error:'failed to fetch products'
      });

      return res.json(products);
  })
}

//get all categories
exports.getAllUniqueCategories = (req, res) => {
    Product.distinct('category', {}, (err, categories) => {
        if(err) return res.status(400).json({
            error: 'something went wrong'
        });

        return res.json(categories);
    })
}

//Middleware to update stock(total_units) and sold_units fileds
exports.updateProductStock = (req, res, next) => {
  console.log('PRODUCT BULK :' + req.body.order.products);
//   let productUpdateOperation = req.body.order.products.map( product => {
//       return {
//           updateOne: {
//               filter: {_id: product._id},
//               update: {$inc:{total_units: -product.count, sold_units: +product.count}}
//           }
//       }
//   });

//   Product.bulkWrite(productUpdateOperation, {}, (err, products) => {
//       if(err) return res.status(400).json({
//           error: 'bulk operation failed'
//       });

//       next();
//   });

}