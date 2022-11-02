const { Router } = require("express");
const { Admin } = require("../db");
const router = Router();

router.post("/", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).send("missing value detected.");
    } else {
      const newAdmin = await Admin.create({
        fullName,
        email,
        password,
      });
      return res.status(201).send("new Admin created.");
    }
  } catch (e) {
    return res.status(400).send(console.log(e));
  }
});

router.get("/", async (req, res) => {
  try {
    const allAdmins = await Admin.findAll();
    return res.json(allAdmins);
  } catch (error) {
    return res.status(404).send(console.log(error));
  }
});

module.exports = router;
