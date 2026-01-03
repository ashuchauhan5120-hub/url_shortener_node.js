const express = require('express')
const shortenRouter = require("./routes/shortenRouter")
const redirectRouter = require("./routes/redirectRouter")
const app = express()
const port = 3000


app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.use("/", shortenRouter)
app.use("/result", redirectRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
