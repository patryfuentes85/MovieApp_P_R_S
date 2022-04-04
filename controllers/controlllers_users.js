const user = require("../models/models_users.js");

const createUser = async (req, res) => {
    try {
      let datos = await user.createUser(req.body);
      res.status(201).json(datos);
    } catch (error) {
      console.log(`ERROR: ${error.stack}`);
    }
};


const users = {
    createUser,
};
module.exports = users;