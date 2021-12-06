const router = require("express").Router();
const path = require("path");
const {
  createUser,
  checkUserByEmail,
  validatePassword,
} = require("../controllers/user");

router.get("/", (req, res) => {
  console.log(req.session);
  res.sendFile(path.join(__dirname, "../" + "/public/index.html"));
});

router.get("/recipe", (req, res) => {
  res.sendFile(path.join(__dirname, "../" + "/public/recipe.html"));
});

router.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "../" + "/public/contact.html"));
});

router.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "../" + "/public/profile.html"));
});

// login routes
router.get("/login", (req, res) => {
  console.log(req.session.user);
  res.sendFile(path.join(__dirname, "../" + "/public/login.html"));
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const checkUser = await checkUserByEmail(email);

  if (!checkUser) {
    return res
      .status(400)
      .json({ status: "error", data: "Email or password is incorrect" });
  }

  if (await validatePassword(password, checkUser.password)) {
    req.session.user = checkUser;
    return res.status(200).json({ status: "ok", data: "Login Succesfull" });
  }
  return res
    .status(400)
    .json({ status: "error", data: "Email or password is incorrect" });
});

//singup routes
router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../" + "/public/signup.html"));
});

router.post("/signup", async (req, res) => {
  const check = await createUser(req.body);

  if (check[0]) {
    req.session.user = check[1];
    return res.status(200).json({ status: "ok", data: check[1] });
  } else {
    return res.status(400).json({ status: "error", data: check[1] });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
