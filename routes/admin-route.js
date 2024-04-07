const express = require('express');
const { userAuth, adminValidator } = require('../Middlewares/auth-middleware');
const adminController = require("../Controllers/admin-controller")
const productController = require("../Controllers/product-controller")
const contactController = require("../Controllers/contact-controller")
const router = express.Router();

router.route('/users').get(userAuth,adminValidator,adminController.getUsersByAdmin)
router.route('/user/:id').get(userAuth,adminValidator,adminController.getSingleUserByAdmin);
router.route('/update/:id').patch(userAuth,adminValidator,adminController.updateUserById)
router.route('/delete/:id').delete(userAuth,adminValidator,adminController.deleteUserById);
router.route('/products').get(userAuth,adminValidator,productController.getAllProducts)
router.route('/product/:id').get(userAuth,adminValidator,productController.getSingleProduct)
router.route('/updateProduct/:id').patch(userAuth,adminValidator,productController.updateProduct)
router.route('/cart').get(userAuth,adminValidator,productController.getAllOrder)
router.route('/updateCart/:id').patch(userAuth,adminValidator,productController.updateStatus)
router.route('/deleteProduct/:id').delete(userAuth,adminValidator,productController.deletOrderById)
router.route('/categories').get(userAuth,adminValidator,productController.getCategories)
router.route('/category/:category').get(userAuth,adminValidator,productController.getSingleCategory)
router.route('/contacts').get(userAuth,adminValidator,contactController.getAllContacts)
router.route('/delOrderByAdmin/:id').delete(userAuth,adminValidator,productController.deleteOrderByAdmin)



//not by admin
router.route('/purchase').post(userAuth,productController.handleBuy) 
router.route('/order/:id').get(userAuth,productController.getSingleOrder)
router.route('/deleteOrder/:id').delete(userAuth,productController.deletOrderById)


module.exports = router;