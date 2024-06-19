var express = require("express");
var router = express.Router();
const productController = require("../controllers/product.controller");


router.get("/products", productController.findAll);

router.get("/products/:id", productController.findOne);

router.post("/products", productController.create);

router.put("/products/:id", productController.update);

router.delete("/products/:id", productController.delete);

router.delete("/products", productController.deleteAll);



module.exports = router;