const mongoose = require("mongoose");

const admSchema = new mongoose.Schema({
  login: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

admSchema.methods.toJSON = function (){
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
  
}

const Adm = mongoose.model("Adm", admSchema);

module.exports = Adm;
