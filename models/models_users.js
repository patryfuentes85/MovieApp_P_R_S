// require("dotenv").config();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
let pg = require('pg');
let pgUrl = process.env.PG_URL;
const client = new pg.Client(pgUrl);
const regex = require('../utils/regex.js');

/* const pool = new Pool({
    host: process.env.PG_HOST,
    user:  process.env.PG_USER,
    database: 'biwxwjfj',
    password: process.env.PG_PASSWORD,
}) */


const createUser = async (user) => {
    let result;
    const { username, usersurname, email, rol, profile_pic, password, password2} = user;
    const hashPassword = await bcrypt.hash(password,10);
    try {
        console.log("entra en el try");
        if (regex.validateEmail(email) && regex.validatePassword(password) && password == password2 ) {
            console.log("entra en el if");
        await client.connect()
        console.log('Conectado');
        const data = await client.query(`INSERT INTO users (username,usersurname,email,rol,profile_pic,password)
        VALUES ($1,$2,$3,$4,$5,$6)`, [username, usersurname, email,rol, profile_pic, hashPassword])
        result = data.rowCount;
        
    } else {
        res.send('usuario incorrecto');
    }
    } catch (error) {
        console.log("Some Error aqui " + error);
    }finally {
         client.release;
    }

    return result;
}


const deleteUser = async (email) => {
    let result;
    try {
        await client.connect()
        console.log('Ready to delete');
        const data = await client.query(`DELETE FROM users
        WHERE email='${email}'`);
        result = data.rowCount;
    } catch (error) {
        console.log("Error de Borrado " + error);
    }finally {
         client.release;
    }

}

const getUsers = async ()=>{
    let result;
    try{
        await client.connect()
        const data = await client.query("select * from users");
        result = data.rows;
    }
    catch(err){
        console.log(err);
        throw err;
    }
    finally{
        client.release;
    }
    return result
}

module.exports={
    createUser,
    deleteUser,
    getUsers
}