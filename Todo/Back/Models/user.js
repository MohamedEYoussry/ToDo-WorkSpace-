const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); //hash password

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required:false
    },
  
    phoneNumber: {
      type: String,
      length: 11,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required:false,

      Date: {
        type: Date,
        default: Date.now,
      },
    },
    Gender: {
      type: String,
      required:false,
      // enum: ["Male", "Female"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(this.password, salt);
  this.password = hashedPassword;
  console.log(this);
  next();
});

var userModel = mongoose.models.User || mongoose.model("users", userSchema);

module.exports = userModel;
