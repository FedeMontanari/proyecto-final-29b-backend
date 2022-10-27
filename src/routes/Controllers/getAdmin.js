const { Admin } = require("../../db");

const getAdmin = async (req, res) => {
  try {
    const allAdmins = await Admin.findAll();
    return res.json(allAdmins);
  } catch (error) {
    return res.status(404).send(console.log(error));
  }
};

module.exports = { getAdmin };
