const Category = require('../models/categories')


exports.getAll = async function(req, res){
    try {
        const categories = await Category.find()
        res.json(categories)
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

exports.add = async function(req, res){
    const categoryExists = await Category.findOne({categoryName : req.body.categoryName})
    if(categoryExists) {res.status(500).json({success: false, message: `Category ${req.body.categoryName} already exists`})}
    const category = new Category({
        categoryName : req.body.categoryName,
        categoryDescription : req.body.categoryDescription
    })
    const errors = category.validateSync()
    if(errors){
        const error = Object.values(errors.errors)
        const e = getErrors(error)
        return res.status(500).json({success: false, errors: e})
    }
    try {
        const newCategory = await category.save()
        res.json({success: true, message: `Category ${newCategory.categoryName} Added`})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }

}

exports.getCategory = async function(req, res){
    res.json(res.category)
}

exports.updateCategory = async function(req, res){
    if(req.body.categoryName != null){res.category.categoryName = req.body.categoryName}
    if(req.body.categoryDescription != null){res.category.categoryDescription = req.body.categoryDescription}

    try {
        const category = await res.category.save()
        res.json({success: true, message: `Category ${category.categoryName} updated`})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

exports.deleteCategory = async function(req, res){
    try {
        const category = res.category.remove()
        res.json({success: true, message: `Category ${res.category.categoryName} removed`})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}


exports.getCategoryById = async function(req, res, next){
    try {
        category = await Category.findById(req.params.id)
        if(category == null) return res.status(500).json({success: false, message: `Category not found`})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
    res.category = category
    next()
}

function getErrors(error){
    var e = {}
    for (var key in error) {
        if (error.hasOwnProperty(key)) {
            e[error[key].properties['path']] = error[key].message
        }
     }
    return e
}