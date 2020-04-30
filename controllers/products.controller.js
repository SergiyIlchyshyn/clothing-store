const Product = require('../models/product');

// Retrieve and return all from the database
exports.findAll = (req, res) => {
    Product.find()
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err));
};

// Find a sigle note with a noteId
exports.findOne = (req, res) => {
    Product.findById(req.params.id)
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err));
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description,
            imagePath: req.body.imagePath,
            price: req.body.price,
            color: req.body.color,
            // size: req.body.size,
            // availability: req.body.availability,
            // season: req.body.season,
            materials: req.body.materials,
            country: req.body.country
        })
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err));
};

// Create and Save
exports.create = (req, res) => {
    // Product.create({
    //     title: req.body.title,
    //     route: req.body.route,
    //     days: req.body.days,
    //     price: req.body.price
    // })
    //     .then(result => res.status(200).json(result))
    //     .catch(err => res.status(500).json(err));
};

// Delete a note identified by the noteId in the request
exports.delete = (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err));
};