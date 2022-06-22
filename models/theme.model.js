const { Schema, model, models } = require("mongoose");

const themeSchema = new Schema(
  {
    colors: {
      background_color: {
        type: String,
        default: "#faf0e6",
      },
      buttons_color: {
        type: String,
        default: "#63544d",
      },
      font_color: {
        type: String,
        default: "#000000",
      },
    },
    currency: {
      en: {
        type: String,
        default: "SR",
      },
      ar: {
        type: String,
        default: "ر.س",
      },
    },
  },
  { timestamps: true }
);
themeSchema.methods.toJSON = function () {
  const theme = this.toObject();
  const { createdAt, updatedAt, __v, ...others } = theme;
  return others;
};

module.exports = models.Theme || model("Theme", themeSchema);
