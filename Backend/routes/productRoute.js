const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const {createProduct,getAllProducts,updateProduct,deleteProduct,getProductDetails} = require("../controllers/productController");

const router = express.Router()


router.route("/products").get(getAllProducts);

router.post("/product/new",isAuthenticatedUser,authorizeRoles("admin"),createProduct);

router.route("/product/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct).get(getProductDetails);

module.exports = router