const pool = require("../db/pool");

// read all urls from db
async function getUrlByShortcode(shortcode) {
  try {
    const query = `
    SELECT * FROM shorten_urls 
    WHERE shortcode = $1 
    `;
    const result = await pool.query(query, [shortcode]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
  }
}

async function creatShortenUrl(shortcode, longUrl) {
  try {
    const query = `
    INSERT INTO shorten_urls (shortcode, url) VALUES ($1 , $2)
    RETURNING *
    `;
    console.log(query)
    const result = await pool.query(query, [shortcode, longUrl]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
  }
}

async function increaseClicks(shortcode) {
  try {
    const query = `
    UPDATE shorten_urls SET clicks = clicks + 1
    WHERE shortcode = $1
    `;
    await pool.query(query, [shortcode]);
  } catch (error) {
    console.error(error);
  }
}


async function deleteUrlById(id) {
    const query = `
    DELETE FROM shorten_urls 
    WHERE id = $1
    RETURNING *
    `;

    const result = await pool.query(query, [id])
    return result.rows[0]
}
module.exports = { getUrlByShortcode, creatShortenUrl, increaseClicks , deleteUrlById};
