const { generateShortCode } = require("../utils/generateShortCode");
const { getUrlByShortcode, creatShortenUrl } = require("../db/crudOperations");

function shortenUrlForm(req, res) {
  res.render("shortenForm");
}

async function getShortenUrl(req, res) {
  const { longUrl } = req.body;

  try {
    if (!longUrl) {
      return res.status(400).send("Enter a url");
    }

    let shortcode;
    let exists;

    do {
      shortcode = generateShortCode();
      exists = await getUrlByShortcode(shortcode);
   
    } while (exists);

    const user_id = req.session.userId
    await creatShortenUrl(shortcode, longUrl, user_id);
    res.redirect(`/result/${shortcode}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server error");
  }
}

module.exports = {
  shortenUrlForm,
  getShortenUrl,
};
