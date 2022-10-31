const { Admin } = require("../../db");

const postAdmin = async (req, res) => {
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
};

module.exports = { postAdmin };
