const { Occupation } = require("../../db");

const getOccupation = async (req, res) => {
  try {
    const allOccupations = await Occupation.findAll();
    return res.json(allOccupations);
  } catch (error) {
    return res.status(404).send(console.log(error));
  }
};

module.exports = { getOccupation };
