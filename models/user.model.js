const { model, Schema } = require("mongoose");
const { isEmail, isMobilePhone, isStrongPassword } = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!isEmail(value)) throw new Error("email format is invalid");
      },
    },
    phone: {
      type: String,
      validate(value) {
        if (!isMobilePhone(value)) throw new Error("phone format is invalid");
      },
    },
    password: {
      type: String,
      required: [true, "password is required"],
      validate(value) {
        if (!isStrongPassword(value))
          throw new Error("Use a strong password instead");
      },
    },
    token: String,
    role: {
      type: String,
      enum: ["SuperAdmin", "Admin", "User"],
      required: true,
      default: "User",
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  const { password, __v, updatedAt, createdAt, ...others } = user;
  return others;
};
userSchema.statics.loginUser = async function (email, password) {
  let user = await this.findOne({ email });
  if (user) {
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Incorrect E-mail");
};
userSchema.methods.generateToken = function () {
  let token = jwt.sign({ _id: this._id }, process.env.TOKEN, {
    expiresIn: "2d",
  });
  this.token = token;
};

const User = model("User", userSchema);
module.exports = User;
