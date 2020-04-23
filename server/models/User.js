const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },

  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: true
  },

  tags: [{
      type: String,
      required:true
      }]
});

userSchema.methods.toJSON = function (){
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
  
}

const User = mongoose.model("User", userSchema);

module.exports = User;
