const { Router } = require("express");
const { Occupation } = require("../db");
const { Op } = require("sequelize");
const { API_KEY } = process.env;
const router = Router();

router.post("", async (req, res) => {
  if (API_KEY === req.query.apikey) {
    try {
      const { name, image } = req.body;
      if (!name || !image) {
        return res.status(400).send("missing value detected.");
      } else {
        const newOccupation = await Occupation.create({
          name,
          image,
        });
        return res.status(201).send("new Occupation created.");
      }
    } catch (e) {
      return res.status(400).send(console.log(e));
    }
  } else {
    return res.status(400).send("Wrong or missing API key");
  }
});

router.get("", async (req, res) => {
  if (API_KEY === req.query.apikey) {
    try {
      const allOccupations = await Occupation.findAll();
      return res.json(allOccupations);
    } catch (error) {
      return res.status(404).send(console.log(error));
    }
  } else {
    return res.status(400).send("Wrong or missing API key");
  }
});

router.get("/name/:occupation", async (req, res) => {
  if (API_KEY === req.query.apikey) {
    let { occupation } = req.params;
    let arr = occupation.split(" ");
    arr = arr.map((e) => {
      let word = e.split("");
      word[0] = word[0].toUpperCase();
      word = word.join("");
      return word;
    });
    arr = arr.join(" ");
    console.log(arr)
    try {
      const findOccupation = await Occupation.findAll({
        where: {
          name:  {[Op.like]: `%${arr}%` },
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
  } else {
    return res.status(400).send("Wrong or missing key");
  }
});

module.exports = router;
