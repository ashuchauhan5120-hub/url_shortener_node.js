require("dotenv").config()
const { Pool } = require("pg")

const pool = new Pool({
    user: 'postgres',
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    port: 5432,
    database: 'url_shortener',
})
console.log("password: ", process.env.DB_PASSWORD)


module.exports = pool