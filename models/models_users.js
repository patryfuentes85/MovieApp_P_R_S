require("dotenv").config();
const { Pool } = require('pg');
let pg = require('pg');
let pgUrl = "postgres://biwxwjfj:HAQiQ0r54fhvVMiueGM5QPaluc0EkssR@manny.db.elephantsql.com/biwxwjfj";
var client = new pg.Client(pgUrl);

const pool = new Pool({
    host: process.env.PG_HOST,
    user:  process.env.USER,
    database: 'postgres',
    password: process.env.PG_PASSWORD,
})


const createUser = async (user) => {
    let result;
    const { user_id, username, usersurname, email,rol, profile_pic, password } = user;
    try {
        await client.connect()
        console.log('Conectado');
        const data = await client.query(`INSERT INTO users (user_id,username,usersurname,email,rol,profile_pic,password)
        VALUES ($1,$2,$3,$4,$5,$6,$7)`, [user_id, username, usersurname, email,rol, profile_pic, password])
        result = data.rowCount;
    } catch (error) {
        console.log("Some Error" + error);
    }finally {
        await client.end();
    }

    return result;
}


// const createUser = async (user) => {
//     console.log(user)
//     let client, result;
//     const { user_id, username, usersurname, email, profile_pic, password } = user;
//     try {
//         client = await pool.connect();
//         const data = await client.query(`INSERT INTO users (user_id,username,usersurname,email,profile_pic,password)
//                                         VALUES ($1,$2,$3,$4,$5)`,[user_id,username,usersurname,email,profile_pic,password])

//         result = data.rowCount;
//     } catch (error) {
        
//     // } finally {
//     //     client.release();
//     }
//     return result
// }

module.exports={
    createUser
}