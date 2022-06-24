const productModel = require("../models/product.model");
const categoryModel = require("../models/category.model");
const successHandler = require("../helpers/successHandler");
const errorHandler = require("../helpers/errorHandler");
class Product {
  static addProduct = async (req, res) => {
    try {
      const product = await productModel.create(req.body);

      successHandler(product, res, "Product added successfully");
    } catch (err) {
      errorHandler(err, res);
    }
  };
  static editProduct = async (req, res) => {
    try {
      let product = await productModel.findByIdAndUpdate(
        req.params.productId,
        req.body
      );
      if (!product) throw new Error("product not found");
      successHandler(product, res, " product is edited successfully");
    } catch (err) {
      errorHandler(err, res);
    }
  };

  static deleteProduct = async (req, res) => {
    try {
      let product = await productModel.findByIdAndDelete(req.params.productId);
      if (!product) throw new Error("product not found");
      successHandler(null, res, " product is deleted successfully");
    } catch (err) {
      errorHandler(err, res);
    }
  };

  static addCategory = async (req, res) => {
    try {
      let category = await categoryModel.create(req.body);

      successHandler(category, res, "category added  successfully");
    } catch (err) {
      errorHandler(err, res);
    }
  };
  static editCategory = async (req, res) => {
    try {
      let category = await categoryModel.findByIdAndUpdate(
        req.params.categoryId,
        req.body
      );
      successHandler(category, res, "category deleted  successfully");
    } catch (err) {
      errorHandler(err, res);
    }
  };
  static deleteCategory = async (req, res) => {
    try {
      await categoryModel.findByIdAndDelete(req.params.categoryId);
      await productModel.deleteMany({ category: req.params.categoryId });
      successHandler(
        null,
        res,
        "category and it's products deleted  successfully"
      );
    } catch (err) {
      errorHandler(err, res);
    }
  };
  static getAllCategories = async (req, res) => {
    try {
      const categories = await categoryModel.find();
      successHandler(categories, res, "categories shown successfully");
    } catch (err) {
      errorHandler(err, res);
    }
  };
  static getNewProducts = async (req, res) => {
    try {
      const newProuducts = await productModel
        .find()
        .sort({ createdAt: -1 })
        .limit(8);
      successHandler(
        newProuducts,
        res,
        "last 8 new Products shown successfully"
      );
    } catch (err) {
      errorHandler(err, res);
    }
  };

  static getProductsByPageAndCategory = async (req, res) => {
    try {
      let products = await productModel
        .find({
          category: req.params.category,
        })
        .skip((req.params.page - 1) * 12)
        .limit(12)
        .populate("category");
      let productsCount = await productModel.countDocuments({
        category: req.params.category,
      });
      let pagesCount = Math.ceil(productsCount / 12);
      successHandler(
        { products, pagesCount },
        res,
        "all Products shown successfully"
      );
    } catch (err) {
      errorHandler(err, res);
    }
  };
  static getProducts = async (req, res) => {
    try {
      let products = await productModel.find().populate("category");
      successHandler(products, res, "all Products shown successfully");
    } catch (err) {
      errorHandler(err, res);
    }
  };
  static uploadImage = async (req, res) => {
    try {
      let productObject = await productModel.findById(req.params.productId);
      if (req.file) {
        await productModel.findByIdAndUpdate(req.params.productId, {
          $set: {
            image: "uploads/" + req.user._id + "/" + req.file.filename,
          },
        });
      } else {
        await productModel.findByIdAndUpdate(req.params.productId, {
          $set: {
            image: "uploads/" + "product.png",
          },
        });
        fs.unlinkSync(productObject.image, (err) => {
          if (err) throw err;
        });
      }
      successHandler(null, res, "image uploaded successfully");
    } catch (e) {
      errorHandler(e, res);
    }
  };
  static uploadImageCate = async (req, res) => {
    try {
      let productObject = await categoryModel.findById(req.params.categoryId);
      if (req.file) {
        await categoryModel.findByIdAndUpdate(req.params.categoryId, {
          $set: {
            image: "uploads/" + req.user._id + "/" + req.file.filename,
          },
        });
      } else {
        await categoryModel.findByIdAndUpdate(req.params.categoryId, {
          $set: {
            image: "uploads/" + "product.png",
          },
        });
        fs.unlinkSync(productObject.image, (err) => {
          if (err) throw err;
        });
      }
      successHandler(null, res, "image uploaded successfully");
    } catch (e) {
      errorHandler(e, res);
    }
  };
}

module.exports = Product;
