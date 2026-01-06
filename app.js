const express = require('express')
const session = require("express-session")
const shortenRouter = require("./routes/shortenRouter")
const redirectRouter = require("./routes/redirectRouter")
const signupRouter = require("./routes/signupRouter")
const loginRouter = require("./routes/loginRouter")
const {requireAuth} = require("./middleware/requireAuth")
const logoutRouter = require("./routes/logoutRouter")
const adminDashboardRouter = require("./routes/adminDashboardRouter")
const app = express()
const port = 3000


app.set('view engine', 'ejs');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.use("/signup", signupRouter )
app.use("/login", loginRouter )
app.use("/logout", logoutRouter)
app.use("/result", requireAuth, redirectRouter)
app.use("/", requireAuth, shortenRouter)
app.use("/", adminDashboardRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
