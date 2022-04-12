let pg = require("pg");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const regex = require("../utils/regex.js");

let localPoolConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
};
const poolConfig = process.env.PG_URL
  ? {
      connectionString: process.env.PG_URL,
      ssl: { rejectUnauthorized: false },
    }
  : localPoolConfig;
const pool = new Pool(poolConfig);

const createUser = async (user) => {
  let result;
  let client;
  const {
    username,
    usersurname,
    email,
    rol = "member",
    profile_pic,
    password,
    password2,
  } = user;
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    console.log("entra en el try");
    if (
      regex.validateEmail(email) &&
      regex.validatePassword(password) &&
      password == password2
    ) {
      console.log("entra en el if");
      client = await pool.connect();
      console.log("Conectado");
      const data = await client.query(
        `INSERT INTO users (username,usersurname,email,rol,profile_pic,password)
        VALUES ($1,$2,$3,$4,$5,$6)`,
        [username, usersurname, email, rol, profile_pic, hashPassword]
      );
      result = data.rowCount;
    } else {
      res.send("usuario incorrecto");
    }
  } catch (error) {
    console.log("Some Error aqui " + error);
  } finally {
    client.release;
  }

  return result;
};

const deleteUser = async (email) => {
  let client;
  let result;
  try {
    client = await pool.connect();
    console.log("Ready to delete");
    const data = await client.query(`DELETE FROM users
        WHERE email='${email}'`);
    result = data.rowCount;
  } catch (error) {
    console.log("Error de Borrado " + error);
  } finally {
    client.release;
  }
};

const getUsers = async (email) => {
  let client;
  let result;
  console.log(email);
  try {
    client = await pool.connect();
    const data = await client.query("select * from users");
    result = data.rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release;
  }
  return result;
};

const getRol = async (email) => {
  let client;
  let result;
  try {
    client = await pool.connect();
    const data = await client.query(
      `SELECT rol FROM users WHERE email = '${email}'`
    );
    result = data.rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release;
  }
  return result;
};

const changeStatus = async (email) => {
  let client;
  let result;
  try {
    console.log(email);
    client = await pool.connect();
    const data = await client.query(
      `SELECT * FROM users WHERE email = "${email}"`
    );
    result = data.rows;
    console.log(result);
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release;
  }
  return result;
};

const recoverpassword = async (email, newpass) => {
  let result;
  try {
    client = await pool.connect();
    const data = await client.query(
      `
      UPDATE users
      SET password=$2
      WHERE email =$1`,
      [email, newpass]
    );
    result = data.rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release;
  }
  return result;
};

module.exports = {
  getRol,
  createUser,
  deleteUser,
  getUsers,
  changeStatus,
  getUsers,
  recoverpassword,
};
