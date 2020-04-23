const bcrypt = require("bcrypt");

const encryptPassword = async password => {
  return await bcrypt.hash(password, 8);
};

const comparePassword = async (password, receivedFromClient) => {
  return await bcrypt.compare(password, receivedFromClient);
};

module.exports = {
  encryptPassword,
  comparePassword
};
