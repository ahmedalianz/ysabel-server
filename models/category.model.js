const { Schema, model, models } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      en: {
        type: String,
        required: true,
      },
      ar: String,
    },
    image: { type: String, required: true },
  },
  { timestamps: true }
);
categorySchema.methods.toJSON = function () {
  const category = this.toObject();
  const { createdAt, updatedAt, __v, ...others } = category;
  return others;
};

module.exports = models.Category || model("Category", categorySchema);
