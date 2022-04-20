const jwt = require("jsonwebtoken");
const user = require("../models/models_users.js");
const accessTokenSecret = "youraccesstokensecret";
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    let datos = await user.createUser(req.body);
    res.status(201).redirect("http://localhost:3000/login");
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
  }
};

const findUserEmail = async (email) => {
  try {
    const response = await user.findOne({ where: { email: email } });
    return response;
  } catch (error) {
    console.log(error);
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
};

const logoutUser = async (req, res) => {
  try {
    const payload = {
      check: true,
    };
    const token = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "0m",
    });
    res
      .cookie("accesstoken", token, {
        httpOnly: true,
        sameSite: "strict",
      })
      .redirect("http://localhost:3000/login");
    console.log("logout okkk !!");
  } catch (error) {
    console.log(error);
  }
};

const recoverpassword = async (req, res) => {
  console.log(req.params.email);
  try {
    let datos = await user.recoverpassword(
      req.params.email,
      req.params.password
    );
    res.status(204).json(datos);
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
  }
};
const recoverPassword = async (req, res) => {
  try {
    const url = "";
    await transporter.sendMail({
      to: req.params.email,
      subject: "Recover Password",
      html: `<h3>Recover Password</h3>
              <a href = ${url}>Click to recover password</a>
              <p>Link will expire in 20 minutes</p>`,
    });
    res.status(200).json({
      message: "A recovery email has been sent to your mail direction",
    });
  } catch (error) {
    console.log("Error:", error);
  }
};

const loginUser = async (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;
  console.log(email, pass);
  try {
    const users = await user.getUsers(email);
    const usuario = users.find((u) => {
      return u.email === email;
    });
    if (usuario) {
      const match = await bcrypt.compare(pass, usuario.password);
      let userRol = usuario.rol;
      console.log(userRol);
      if (match) {
        const payload = {
          check: true,
          email: usuario.email,
          usename: usuario.username,
          role: userRol,
        };
        const token = jwt.sign(payload, accessTokenSecret, {
          expiresIn: "15m",
        });
        console.log(payload);
        if (userRol == "admin") {
          res
            .cookie("accesstoken", token, {
              httpOnly: true,
              sameSite: "strict",
            })
            .redirect("http://localhost:3000/admin");
        } else {
          res
            .cookie("accesstoken", token, {
              httpOnly: true,
              sameSite: "strict",
            })
            .redirect("http://localhost:3000/dashboard");
        }
      } else {
        res.render("Pass_incorrecto.pug");
      }
    } else {
      res.render("Pass_incorrecto.pug");
    }
    console.log("login okkk !!");
  } catch (error) {
    console.log(error);
  }
};

const users = {
  logoutUser,
  createUser,
  deleteUser,
  getUsers,
  loginUser,
  findUserEmail,
  recoverpassword,
};
module.exports = users;
