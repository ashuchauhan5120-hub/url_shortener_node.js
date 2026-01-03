const { generateShortCode } = require("../utils/generateShortCode");
const { getUrlByShortcode, creatShortenUrl } = require("../db/crudOperations");

function shortenUrlForm(req, res) {
  res.render("shortenForm");
}

async function getShortenUrl(req, res) {
  const { longUrl } = req.body;

  try {
    if (!longUrl) {
      return res.status(404).send("Enter a url");
    }

    let shortcode;
    let exists;

    do {
      shortcode = generateShortCode();
      exists = await getUrlByShortcode(shortcode);
      console.log("exists: ", exists);
    } while (exists);
    await creatShortenUrl(shortcode, longUrl);
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
