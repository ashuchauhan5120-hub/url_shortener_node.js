const pool = require("../db/pool");

// read all urls from db
async function getUrlByShortcode(shortcode, user_id) {
  const query = `
    SELECT * FROM shorten_urls 
    WHERE shortcode = $1 AND user_id = $2 
    `;
  const result = await pool.query(query, [shortcode, user_id]);
  return result.rows[0];
}

async function creatShortenUrl(shortcode, longUrl, user_id) {
  const query = `
    INSERT INTO shorten_urls (shortcode, url, user_id) VALUES ($1 , $2, $3)
    RETURNING *
    `;
  console.log(query);
  const result = await pool.query(query, [shortcode, longUrl, user_id]);
  return result.rows[0];
}

async function increaseClicks(shortcode, user_id) {
  const query = `
    UPDATE shorten_urls SET clicks = clicks + 1
    WHERE shortcode = $1 AND user_id = $2
    `;
  await pool.query(query, [shortcode, user_id]);
}

async function deleteUrlById(id, user_id) {
  const query = `
    DELETE FROM shorten_urls 
    WHERE id = $1 AND user_id = $2
    RETURNING *
    `;

  const result = await pool.query(query, [id, user_id]);
  return result.rows[0];
}
module.exports = {
  getUrlByShortcode,
  creatShortenUrl,
  increaseClicks,
  deleteUrlById,
};
