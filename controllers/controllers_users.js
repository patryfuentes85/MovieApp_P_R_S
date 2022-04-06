const user = require("../models/models_users.js");

const createUser = async (req, res) => {
    try {
      let datos = await user.createUser(req.body);
      res.status(201).json(datos);
    } catch (error) {
      console.log(`ERROR: ${error.stack}`);
    }
};

const getUsers = async (req, res) => {
  try {
    let datos = await user.getUsers(req.body);
    res.status(200).json(datos);
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
  }
};


const deleteUser = async (req, res) => {
  console.log(req.params.email);
  try {
    let datos = await user.deleteUser(req.params.email);
    res.status(204).json(datos);
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
  }
}


const users = {
  createUser,
  deleteUser,
  getUsers
};
module.exports = users;