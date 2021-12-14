const router = require("express").Router();
const multer = require("multer");
const { storage } = require("../services/cloudinary");
const upload = multer({ storage });
const { checkUserByIDandUpdate } = require("../controllers/user");

router.post("/image", upload.single("image"), async (req, res) => {
  const user = await checkUserByIDandUpdate(req.body.userID, req.file.path);
  res.redirect("/profile");
});

module.exports = router;
