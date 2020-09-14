const Category = require('../models/category.models');


exports.getCategoryById = (req, res, next, id) => {
    Category.findById({_id: id}).exec((err, category) => {
        if(err) return res.status(400).json({
            error: 'fetching category by Id failed'
        });

        req.category = category;
        next();
    })
}

exports.createCategory = (req, res) => {
    const category = new Category();
    category.name = req.body.name;
    category.save((err, category) => {
        if(err) return res.status(400).json({
            error: 'something went wrong, failed to save category'
        });

        return res.json({
            message: 'category saved successfully',
            category
        });
    });
}

exports.getCategory = (req, res) => {
    return res.json(req.category);
}

exports.getAllCategories = (req, res) => {
    Category.find({}, {name: 1}).exec((err, categories) => {
        if(err) return res.status(400).json({
            error: 'something went wrong, failed to fetch categories'
        });

        return res.json(categories);
    })
}

exports.updateCategory = (req, res) => {
    console.log(req.category)
    const category = req.category;
    category.name = req.body.name;

    category.save((err, category) =>{
        if(err) return res.status(400).json({
            error: 'something went wrong, failed to update category'
        });

        return res.json({
            message:'Category updated successfully',
            category
        });
    });
}

exports.removeCategory = (req, res) => {
  const category = req.category;
  category.remove((err, result) => {
    if(err) return res.status(400).json({
        error: 'something went wrong, failed to delete category'
    });

    return res.json({
        message: 'successfully deleted',
        result
    });
  })
}