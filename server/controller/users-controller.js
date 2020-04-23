const {
  updateUser,
  createUser,
  deleteUser,
  getUser,
  getUsers
} = require("../services/users-services");

const postNewUser = async (req, res) => {
  const data = req.body;
  try {
    const user = await createUser(data);
    return res.send(user).status(201);
  } catch (e) {
    res.send({ error: e.message }).status(401);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();
    return res.send(users);
  } catch (e) {
    res.send({ error: e.message });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await getUser(id);
    return res.send(user).status(200);
  } catch (e) {
    res.send({ error: e.message }).status(400);
  }
};

const deleteUserById = async (req, res) => {
  const id = req.params.id;
  try {
    await deleteUser(id);
    return res.send().status(204);
  } catch (e) {
    res.send({ error: e.message });
  }
};

const updateUserById = async (req, res) => {
  try {
    const user = await updateUser(req.params.id, req.body);
    return res.send(user).status(200);
  } catch (e) {
    res.send().status(400);
  }
};

module.exports = {
  postNewUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById
};
