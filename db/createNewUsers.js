const pool = require("./pool");

async function checkUserByEmail(email) {
    const query = `
    SELECT * FROM users 
    WHERE email = $1
    `;

    const result = await pool.query(query, [email])
    return result.rows[0];
};

async function createNewUser(username, email, hashPassword) {
    const query = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    `;

    const result = await pool.query(query,  [username, email, hashPassword]);
    return result.rows[0]
}

async function getShortenUrlbyUserId(user_id) {
  try {
    const query = `
    SELECT * FROM shorten_urls 
    WHERE user_id = $1 
    `;
    const result = await pool.query(query, [user_id]);
    return result.rows;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
    checkUserByEmail,
    createNewUser,
    getShortenUrlbyUserId
}
