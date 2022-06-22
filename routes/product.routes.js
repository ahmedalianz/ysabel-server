const productController = require("../controller/product.controller");
const router = require("express").Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/fileUpload");

//----------------public crud operations of product -----
router.get(
  "/getProductsByPageAndCategory/:page/:category",
  productController.getProductsByPageAndCategory
);
router.get("/getProducts", productController.getProducts);

router.get("/getNewProducts", productController.getNewProducts);

//----------------crud operations of product controlled by admin-----
router.post("/addProduct", auth("Admin"), productController.addProduct);
router.patch(
  "/editProduct/:productId",
  auth("Admin"),
  productController.editProduct
);
router.patch(
  "/uploadImage/:productId",
  [auth("Admin"), upload.single("img")],
  productController.uploadImage
);
router.patch(
  "/uploadImageCate/:categoryId",
  [auth("Admin"), upload.single("img")],
  productController.uploadImageCate
);
router.delete(
  "/deleteProduct/:productId",
  auth("Admin"),
  productController.deleteProduct
);

//----------------categories-----
router.post("/addCategory", auth("Admin"), productController.addCategory);
router.patch(
  "/editCategory/:categoryId",
  auth("Admin"),
  productController.editCategory
);
router.delete(
  "/deleteCategory/:categoryId",
  auth("Admin"),
  productController.deleteCategory
);
router.get("/getAllCategories", productController.getAllCategories);

module.exports = router;
