const { Router } = require("express");
const { postOccupation } = require("../Controllers/postOccupation");
const { getOccupation } = require("../Controllers/getOccupation");
const router = Router();

router.post("", postOccupation);
router.get("", getOccupation);

router.get("/:occupation", async (req, res) => {
  let { occupation } = req.params;
  let arr = occupation.split("");
  arr = arr.map((e) => {
    let word = e.split("");
    word[0] = word[0].toUpperCase();
    word = word.join("");
    return word;
  });
  arr = arr.join(' ');
  try {
    const findOccupation = await occupation.findAll({
      where: {
        name: arr,
      },
    });
    if (findOccupation.length === 0) {
      res.status(400).send("Occupation not found");
    } else {
      res.status(200).json(findOccupation);
    }
  } catch (error) {
    res.status(400).send(console.log(error));
  }
});

module.exports = router;
