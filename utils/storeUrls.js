const path = require("path")
const fs = require("fs")

const filePath = path.join(__dirname, "../url.json");

function getAllUrls(){
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data)
}

function createUrl(url){
    return fs.writeFileSync(filePath, JSON.stringify(url), "utf-8")
}

module.exports = {
    getAllUrls,
    createUrl
}