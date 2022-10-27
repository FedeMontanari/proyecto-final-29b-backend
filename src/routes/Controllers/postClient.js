const { Client } = require("../../db");

const postClient = async (req, res) => {
  try {
    const {
      fullName,
      phoneNumber,
      email,
      address,
      description,
      image,
      password,
      reviews,
    } = req.body;
    if (
      !fullName ||
      !phoneNumber ||
      !email ||
      !address ||
      !description ||
      !password
    ) {
      return res.status(400).send("missing value detected.");
    } else {
      const newClient = await Client.create({
        fullName,
        phoneNumber,
        email,
        address,
        description,
        image,
        password,
        reviews,
      });
      return res.status(201).send("new Client created.");
    }
  } catch (e) {
    return res.status(400).send(console.log(e));
  }
};

module.exports = { postClient };
