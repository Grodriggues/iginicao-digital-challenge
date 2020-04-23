const User = require("../models/User");

const getUser = async id => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (e) {
    throw new Error(e.message);
  }
};

const createUser = async data => {
  const user = new User(data);
  try {
    await user.save();
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

const updateUser = async (id, content) => {
  const allowedUpadates = ["name","email","tags"];
  const updates = Object.keys(content);
  const isValid = updates.every(update => allowedUpadates.includes(update));
  if(!isValid) throw new Error("you must provide the proper fields");
  try {
    const user = await User.findById(id);
    updates.map(update => user[update] = content[update]);
    await user.save();
    return user;
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteUser = async id => {
  try {
    const user = await User.findByIdAndDelete(id);
    return user;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUsers
};
