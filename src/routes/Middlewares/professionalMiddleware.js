const { Router } = require("express");
const { getProfessional } = require("../Controllers/getProfessional.js");
const { postProfessional } = require("../Controllers/postProfessional.js");
const { Professional } = require("../../db");
const router = Router();

router.get("", getProfessional);
router.post("", postProfessional);
router.get("/:fullName", async (req, res) => {
  let { fullName } = req.params;
  let arr = fullName.split(" ");
  arr = arr.map((e) => {
    let word = e.split("");
    word[0] = word[0].toUpperCase();
    word = word.join("");
    return word;
  });
  arr = arr.join(" ");
  try {
    const findProfessional = await Professional.findAll({
      where: {
        fullName: arr,
      },
    });
    if (findProfessional.length === 0) {
      res.status(400).send("Name not found");
    } else {
      res.status(200).json(findProfessional);
    }
  } catch (error) {
    res.status(400).send(console.log(error));
  }
});

router.put("", async (req, res) => {
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
      rating,
      pricing,
    } = req.body;
    

    if (email) {
      const prof = await Professional.findOne({
        where: {
          email: email,
        },
      });

      if (prof)
        var updateProf = {
          fullName,
          phoneNumber,
          email,
          occupation,
          address,
          description,
          image,
          password,
          reviews,
          rating,
          pricing,
        };

      prof.update(updateProf);
      return res.status(200).send("professional Updated.");
    }
  } catch (e) {
    return res.status(404).send("Professional not found.");
  }
});

module.exports = router;
