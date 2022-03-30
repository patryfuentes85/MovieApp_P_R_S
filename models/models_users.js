require("dotenv").config();
const { Pool } = require('pg');


const pool = new Pool({
    host: process.env.PG_HOST,
    user:  process.env.USER,
    database: 'postgres',
    password: process.env.PG_PASSWORD,

})

const addUser = async (user) => {
    let client, result;
    const { user_id, username, usersurname, email, profile_pic, password } = user;
    try {
        client = await pool.connect();
        const data = await client.query(`INSERT INTO users (user_id,username,usersurname,email,profile_pic,password)
                                        VALUES ($1,$2,$3,$4,$5)`,[user_id,username,usersurname,email,profile_pic,password])

        result = data.rowCount;
    } catch (error) {
        
    } finally {
        client.release();
    }
    return result
}