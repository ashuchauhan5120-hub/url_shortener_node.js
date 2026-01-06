const bcrypt = require("bcrypt");
const { checkUserByEmail } = require("../db/createNewUsers");

function showLoginForm(req, res) {
  res.render("loginForm");
}

async function loginUser(req, res) {
  const { username, email, password } = req.body;

  if (!email || !password){
    return res.status(400).send("Invalide email and password")
  }

  const user = await checkUserByEmail(email)

  const match = await  bcrypt.compare(password, user.password)
  if (!match){
    return res.status(401).send("Unauthorized")
  }

  req.session.userId = user.id;
  req.session.role = user.role;

  res.redirect("/")
}

module.exports = {
  showLoginForm,
  loginUser
};
