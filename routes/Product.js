const express = require("express");
const {
  createProduct,
  fetchProductByAdmin,
  fetchProduct,
  fetchAllProducts,
  fetchProductById,
  updateProduct,
  deleteProduct,
  fetchProductReq,
  approveProduct,
} = require("../controller/Product");
const { isAdmin, isAuth } = require("../Services/Comman");
const router = express.Router();

router
  .post("/add", isAdmin(), createProduct)
  .get("/get", isAdmin(), fetchProductByAdmin)
  .get("/req", isAuth(), fetchProductReq)
  .put("/approve/:id", isAuth(), approveProduct)
  .put("./add/:id", isAdmin(), updateProduct)
  .get("/", isAuth(), fetchAllProducts)
  .get("/:id", isAuth(), fetchProductById)
  .delete("/:id", isAdmin(), deleteProduct)

module.exports = router;
