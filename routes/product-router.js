const express = require('express');
const prodController = require('../Controllers/product-controller');
const router = express.Router();

router.route('/products').post(prodController.createProduct)
router.route('/products/all').get(prodController.getAllProducts)
router.route("/product/:id").get(prodController.getSingleProduct);

module.exports = router