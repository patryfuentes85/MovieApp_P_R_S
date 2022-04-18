const express = require("express");
const jwt = require("jsonwebtoken");
const user = require("../models/models_users");
const jwt_secret = "youraccesstokensecret";

const protectedRoutesAdmin = express.Router();

protectedRoutesAdmin.use(async (req, res, next) => {
  const token = req.headers.cookie;
  console.log(token.substring(12));
  if (token) {
    jwt.verify(token.substring(12), jwt_secret, async (err, decoded) => {
      console.log(decoded.email)
      let rol = await user.getRol(decoded.email);
      console.log(rol);
      if (rol[0].rol == "admin") {
        next();
      } else if (rol[0].rol == "member") {
        return res.json({ msg: "No tienes permiso para estar aquí" });
      } else {
        return res.json({ msg: "Invalid token" });
      }
    });
  }
  // let rol = await user.getRol("sergioiznaola3@gmail.com")
});

module.exports = protectedRoutesAdmin;
