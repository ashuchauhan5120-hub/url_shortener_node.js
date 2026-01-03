// const { getAllUrls, createUrl } = require("../utils/storeUrls");
const {getUrlByShortcode, increaseClicks, deleteUrlById} = require("../db/crudOperations")

async function sendToOriginalUrl(req, res) {
    const shortcode = req.params.shortcode;
    try {
        if (!shortcode) {
            return res.status(404).send("Shortcode not found");
        }

        // const urls = getAllUrls();
        const urlRow = await getUrlByShortcode(shortcode);
        // console.log(urlRow)
        const originalUrl = urlRow.url;
        if (originalUrl) {
            await increaseClicks(shortcode);
            res.redirect(originalUrl);
        }

        return res.status(404).send("Url not found");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}


async function showResult(req, res) {
    const shortcode = req.params.shortcode;

    try {
        if (!shortcode) {
            return res.status(500).send("Shortcode not found")
        }

        // const urls = getAllUrls()
         const urlRow = await getUrlByShortcode(shortcode);
         console.log("display route: ", urlRow)
        res.render("result", {
            shortenlink: `http://localhost:3000/${shortcode}`,
            click: urlRow.clicks,
            id: urlRow.id,
            shortcode: urlRow.shortcode
        })
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

async function removeUrlByID(req, res) {
    const id = req.params.id;

    if(!id){
        return res.status(404).send("ID not found")
    }

    const urlRow = await deleteUrlById(id)
    if (urlRow){
        return res.json({
            success: true,
            deleted: id
        })
    }else{
        console.error("Something went wrong")
    }

}

module.exports = {sendToOriginalUrl, showResult, removeUrlByID}