const { Router } = require("express");
const { Op } = require("sequelize")
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
        fullName: { [Op.like]: `%${arr}%` },
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

router.delete("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) return res.status(200).send("Missing value detected.");
    else {
      let prof = await Professional.findOne({
        where: {
          email: email,
        },
      });

      if (prof.length !== 0) {
        Professional.destroy({
          where: {
            email: email,
          },
        });
        return res.status(200).send("Professional deleted.");
      } else res.status(404).send("Professional not found.");
    }
  } catch (e) {
    res.status(400).send(console.log(e));
  }
});

router.get("/id/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const findProfessional = await Professional.findOne({
      where: {
        id: id,
      },
    });
    if (findProfessional.length === 0) {
      res.status(404).send("Professional not found");
    } else {
      res.status(200).json(findProfessional);
    }
  } catch (error) {
    res.status(400).send(console.log(error));
  }
});

module.exports = router;
