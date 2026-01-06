const bcrypt = require("bcrypt");

const { checkUserByEmail, createNewUser } = require("../db/createNewUsers");

function showSignupForm(req, res) {
  res.render("signupForm");
}

async function addSignupUserToDB(req, res) {
  const { username, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Enter valide email and password");
  }

  // check usre in db to avoid duplication
  const user = await checkUserByEmail(email);

  if (user) {
    return res.send("User already exists");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  // add new user to database
  createNewUser(username, email, hashPassword);
  res.redirect("/login");
}
module.exports = {
  showSignupForm,
  addSignupUserToDB,
};
