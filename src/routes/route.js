const express = require("express");
const router = express.Router();

const {createProductDetails,getAllProductandPeginationFeature,getAllProduct}= require("../controller/productController")

router.post("/productCreation",createProductDetails );
router.get("/getAllProductwithPegination", getAllProductandPeginationFeature);
router.get("/getAllProductBaseOnquery", getAllProduct);


module.exports = router;