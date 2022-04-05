// require("dotenv").config();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
let pg = require('pg');
let pgUrl = process.env.PG_URL;
const client = new pg.Client(pgUrl);

/* const pool = new Pool({
    host: process.env.PG_HOST,
    user:  process.env.PG_USER,
    database: 'biwxwjfj',
    password: process.env.PG_PASSWORD,
}) */


const createUser = async (user) => {
    let result;
    const { username, usersurname, email, rol, profile_pic, password } = user;
    const hashPassword = await bcrypt.hash(password,10);
    try {
        await client.connect()
        console.log('Conectado');
        const data = await client.query(`INSERT INTO users (username,usersurname,email,rol,profile_pic,password)
        VALUES ($1,$2,$3,$4,$5,$6)`, [username, usersurname, email,rol, profile_pic, hashPassword])
        result = data.rowCount;
    } catch (error) {
        console.log("Some Error aqui " + error);
    }finally {
        await client.end();
    }

    return result;
}

/* const getUsers = async ()=>{
    let client,result;
    try{
        client = await pool.connect();
        const data = await client.query("select * from users");
        result = data.rows;
    }
    catch{
        console.log(err);
        throw err;
    }
    finally{
        client.release();
    }
    return result
}
getUsers() */

module.exports={
    createUser,
    //getUsers
}