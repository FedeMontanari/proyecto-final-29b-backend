const { Professional } = require("../../db");

const postProfessional = async (req, res) => {
  try {
    const {
      fullName,
      phoneNumber,
      email,
      occupation,
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
      !occupation ||
      !address ||
      !description ||
      !password
    ) {
      return res.status(400).send("missing value detected.");
    } else {
      const newProfessional = await Professional.create({
        fullName,
        phoneNumber,
        email,
        occupation,
        address,
        description,
        image,
        password,
        reviews,
      });
      return res.status(201).send("new Professional created.");
    }
  } catch (e) {
    return res.status(400).send(console.log(e));
  }
};

module.exports = { postProfessional };
