const { generateShortCode } = require("../utils/generateShortCode");
// const { getAllUrls, createUrl } = require("../utils/storeUrls");
const {getUrlByShortcode, creatShortenUrl} = require("../db/crudOperations")

function shortenUrlForm(req, res) {
    res.render("shortenForm");
}

async function getShortenUrl(req, res) {
    const { longUrl } = req.body;

    try {
        if (!longUrl) {
            return res.status(404).send("Enter a url");
        }

        // const urls = getAllUrls();
        let shortcode;
        let exists;

        do {
            shortcode = generateShortCode();
            exists = await getUrlByShortcode(shortcode)
            console.log("exists: ", exists)
        } while (exists);

        // urls[shortcode] = {
        //     url: longUrl,
        //     clicks: 0,
        // };
         await creatShortenUrl(shortcode, longUrl);
         console.log("new shorten url:", creatShortenUrl)

        res.redirect(`/result/${shortcode}`)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server error")
    }
}

module.exports = {
    shortenUrlForm,
    getShortenUrl,
};
