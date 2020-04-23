const { generateAuthToken } = require("../helpers/token-helper");

const storeAuthToken = async (user = {}) => {
  if (!user.save){
    throw new Error("You must provide parementers to this function");
  }

  const token = generateAuthToken(user._id.toString(),process.env.TOKEN_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return { token,user };
};

module.exports = {
  storeAuthToken
};
