const Product = require('../models/product.model');

exports.create = async (req, res) => {
    try {
        const { name, description, price, quantity, category } = req.body;
        const product = new Product({ name, description, price, quantity, category });
        const data = await product.save();
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the product."
        });
    }
};

exports.findAll = (req, res) => {
    let name = req.query.name;
    let condition = name ? { name: { $regex: new RegExp(name, 'i') } } : {};
    Product.find(condition)
        .then(products => res.send(products))
        .catch(err => res.status(500).send({
            message: err.message || "Some error occurred while retrieving products."
        }));
};

exports.findOne = (req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            if (!product) return res.status(404).send({
                message: `Product not found with id ${req.params.id}`
            });
            res.send(product);
        })
        .catch(err => res.status(500).send({
            message: `Error retrieving product with id ${req.params.id}`
        }));
};

exports.update = (req, res) => {

    Product.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
        .then(product => {
            if (!product) return res.status(404).send({
                message: `Product not found with id ${req.params.id}`
            });
            res.send({ message: "Product updated successfully." });
        })
        .catch(err => res.status(500).send({
            message: `Error updating product with id ${req.params.id}`
        }));
};

exports.delete = (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(product => {
            if (!product) return res.status(404).send({
                message: `Product not found with id ${req.params.id}`
            });
            res.send({
                acknowledged: true,
                deletedCount: 1
            });
        })
        .catch(err => res.status(500).send({
            message: `Could not delete product with id ${req.params.id}`
        }));
};

exports.deleteAll = (req, res) => {
    Product.deleteMany()
        .then(product => {
            res.send({ acknowledged: true, message: `${product.deletedCount} Products deleted successfully!` });
        })
        .catch(err => res.status(500).send({
            message: "Some error occurred while removing all products."
        }));
};