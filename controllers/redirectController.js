const {
  getUrlByShortcode,
  increaseClicks,
  deleteUrlById,
} = require("../db/crudOperations");

async function sendToOriginalUrl(req, res) {
  const shortcode = req.params.shortcode;
  const user_id = req.session.userId;

  try {
    if (!shortcode) {
      return res.status(404).send("Shortcode not found");
    }

    const urlRow = await getUrlByShortcode(shortcode, user_id);

    if (!urlRow) {
      return res.status(404).send("url not found")
    }
    const originalUrl = urlRow.url;
    if (originalUrl) {
      await increaseClicks(shortcode, user_id);
      return res.redirect(originalUrl);
    }

    return res.status(404).send("Url not found");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

async function showResult(req, res) {
  const shortcode = req.params.shortcode;
  const user_id = req.session.userId;

  try {
    if (!shortcode) {
      return res.status(500).send("Shortcode not found");
    }

    const urlRow = await getUrlByShortcode(shortcode, user_id);

    if (!urlRow) {
      return res.status(404).send("url not found")
    }
  
    res.render("result", {
      shortenlink: `http://localhost:3000/${shortcode}`,
      click: urlRow.clicks,
      id: urlRow.id,
      shortcode: urlRow.shortcode,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function removeUrlByID(req, res) {
  const id = req.params.id;
  const user_id = req.session.userId;
  const role = req.session.role;

  if (!id) {
    return res.status(404).send("ID not found");
  }

  const urlRow = await deleteUrlById(id, user_id);

  if (urlRow.userId !== user_id && role !== "admin"){
    return res.status(403).send("Not allowed")
  }
  if (urlRow) {
    return res.json({
      success: true,
      deleted: id,
    });
  } else {
    console.error("Something went wrong");
  }
}

module.exports = { sendToOriginalUrl, showResult, removeUrlByID };
