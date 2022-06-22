const { Schema, model, models } = require("mongoose");

const ProductSchema = new Schema(
  {
    name_ar: {
      type: String,
    },
    name_en: {
      type: String,
      required: [true, "Product english name is required"],
    },
    desc_ar: { type: String },
    desc_en: {
      type: String,
    },
    image: {
      type: String,
      default: "/images/product.png",
    },
    price: { type: Number, required: [true, "Product Price is Required"] },
    bestSeller: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product Category is Required"],
    },
  },
  { timestamps: true }
);
ProductSchema.methods.toJSON = function () {
  const product = this.toObject();
  const { createdAt, updatedAt, __v, ...others } = product;
  return others;
};

module.exports = models.Product || model("Product", ProductSchema);
